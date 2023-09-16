#!/usr/bin/env python
"""
The Thieves Guild - Harvesting & Loot Resources
===============================================

This Python module retrieves the harvesting and loot resources from
`The Thieves Guild <https://www.thievesguild.cc/harvest/>`__.
"""

import aiohttp
import asyncio
import json
import re
from bs4 import BeautifulSoup
from pathlib import Path

__copyright__ = "Copyright 2023 Thomas Mansencal"
__license__ = "MIT License - https://opensource.org/licenses/MIT"
__maintainer__ = "Thomas Mansencal"
__email__ = "thomas.mansencal@gmail.com"
__status__ = "Production"

__all__ = [
    "URL_BASE_ROOT",
    "URL_BASE_HARVEST_ROOT",
    "URL_BASE_HARVEST_MONSTER_ROOT",
    "USER_AGENT",
    "PATH_JSON",
    "TEMPLATE_MONSTER",
    "TEMPLATE_ITEM",
    "TEMPLATE_SIZE_MEAT",
    "SIZE_MONSTERS",
    "MAPPING_SIZE_LETTER_TO_SIZE",
    "urljoin",
    "parse_urls",
    "parse_text",
    "read_url",
    "parse_monster_page",
    "thievesguild_harvesting_and_loot_resources",
]

URL_BASE_ROOT = "https://www.thievesguild.cc"
URL_BASE_HARVEST_ROOT = "/harvest"
URL_BASE_HARVEST_MONSTER_ROOT = "/harvest/creature.php"
USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 "
    "Safari/605.1.15"
)
PATH_JSON = (
    Path(__file__).parent.parent / "resources" / "harvesting_and_loot_resources.json"
)
TEMPLATE_MONSTER = {
    "name": None,
    "size": None,
    "description": None,
    "harvesting": {"type": None, "skill": None},
    "source": None,
}

TEMPLATE_ITEM = {
    "name": None,
    "description": None,
    "DC": None,
    "price": None,
    "denomination": None,
    "weight": None,
    "expire": None,
}

TEMPLATE_SIZE_MEAT = {
    "DC": None,
    "quantity": None,
    "weight": None,
    "expire": None,
    "price": None,
}

SIZE_MONSTERS = ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"]

MAPPING_SIZE_LETTER_TO_SIZE = {size[0].upper(): size for size in SIZE_MONSTERS}


def urljoin(*uris):
    if len(uris) == 1:
        return uris[0]

    safe_urls = [
        f"{url.lstrip('/')}/" if not url.endswith("/") else url.lstrip("/")
        for url in uris[:-1]
    ]
    safe_urls.append(uris[-1].lstrip("/"))
    return "".join(safe_urls)


def parse_urls(html_soup):
    urls = []

    for link in html_soup.find_all("a"):
        url = link.get("href")
        if url is not None:
            urls.append(url)

    return urls


def parse_text(element):
    text = re.sub(r"\[|\]|\t", "", element.text.strip())
    text = re.sub(r"(\d+d\d+)", r"[[/r \1]]", text)

    text = re.sub(r"\s?lb\.", r" lb", text)

    return text


async def read_url(session, url):
    async with session.get(url) as response:
        return await response.read()


async def parse_monster_page(session, url):
    html_soup = BeautifulSoup(await read_url(session, url))

    monster = TEMPLATE_MONSTER.copy()

    size = None
    for b in html_soup.select_one(".harvestcreature").find_all("b"):
        if "Size" in b.text:
            size = MAPPING_SIZE_LETTER_TO_SIZE[parse_text(b.next_sibling)]

    items = []
    table_items = html_soup.select_one(".harvtable")
    if table_items is not None:
        for row in table_items.select(".flexrow"):
            item = TEMPLATE_ITEM.copy()
            try:
                price, denomination = parse_text(
                    row.select_one(".col4").find("span").next_sibling
                ).split()
                price = int(price)
            except ValueError:
                price, denomination = None, None

            try:
                weight = int(
                    parse_text(
                        row.select_one(".col5").find("span").next_sibling
                    ).replace(" lb", "")
                )
            except ValueError:
                weight = None

            item.update(
                name=parse_text(
                    row.select_one(".col2").find_all("span")[0].next_sibling
                ),
                DC=int(
                    parse_text(
                        row.select_one(".col2")
                        .select_one(".showmob")
                        .find("span")
                        .next_sibling
                    )
                ),
                description=parse_text(row.select_one(".col3")),
                price=price,
                denomination=denomination,
                weight=weight,
                expire=parse_text(row.select_one(".col6").find("span").next_sibling),
            )
            items.append(item)

    meat = TEMPLATE_SIZE_MEAT.copy()
    table_meat = html_soup.select_one(".meattable")
    if table_meat is not None:
        row = table_meat.select_one(f".row{SIZE_MONSTERS.index(size)+1}")
        meat.update(
            DC=parse_text(row.select_one(".col2").find("span").next_sibling),
            quantity=parse_text(row.select_one(".col3").find("span").next_sibling),
            weight=parse_text(row.select_one(".col4").find("span").next_sibling),
            expire=parse_text(row.select_one(".col5").find("span").next_sibling),
            price=parse_text(row.select_one(".col6").find("span").next_sibling),
        )

    type_and_skill = html_soup.select_one(".margHarvleft:has(b)")

    monster.update(
        name=parse_text(html_soup.select_one(".titlemain:has(h1)").find("h1")),
        description=parse_text(
            html_soup.select_one(".harvestcreature").find("br").previous_sibling,
        ),
        size=size,
        harvesting={
            "type": parse_text(type_and_skill.find_all("br")[0].previous_sibling)
            if type_and_skill
            else None,
            "skill": parse_text(type_and_skill.find_all("br")[1].previous_sibling)
            if type_and_skill
            else None,
            "items": items,
        },
        meat=meat,
        source=url,
    )

    return monster


async def thievesguild_harvesting_and_loot_resources():
    async with aiohttp.ClientSession(headers={"user-agent": USER_AGENT}) as session:
        html_soup = BeautifulSoup(
            await read_url(session, urljoin(URL_BASE_ROOT, URL_BASE_HARVEST_ROOT))
        )

        pages = [
            url
            for url in parse_urls(html_soup)
            if url.startswith(urljoin(URL_BASE_ROOT, URL_BASE_HARVEST_MONSTER_ROOT))
        ]

        monsters = await asyncio.gather(
            *[asyncio.create_task(parse_monster_page(session, page)) for page in pages]
        )

        return {monster["name"]: monster for monster in monsters}


if __name__ == "__main__":
    monsters = asyncio.run(thievesguild_harvesting_and_loot_resources())

    with open(PATH_JSON, "w") as json_file:
        json.dump(dict(sorted(monsters.items())), json_file, indent=2)
