#!/usr/bin/env python
"""
DnD Beyond - Monster Resources
==============================

This Python module retrieves the monster resources, e.g. image and stat block
urls, from `DnD Beyond <https://www.dndbeyond.com/monsters>`__.

Notes
-----
-   Typically and because of rate limiting, the retrieval needs to be done in
    two passes: one forward, and one reverse.
"""

import contextlib
import requests
import random
import time
import json
from tqdm import tqdm
from bs4 import BeautifulSoup
from pathlib import Path

__copyright__ = "Copyright 2023 Thomas Mansencal"
__license__ = "MIT License - https://opensource.org/licenses/MIT"
__maintainer__ = "Thomas Mansencal"
__email__ = "thomas.mansencal@gmail.com"
__status__ = "Production"

__all__ = [
    "URL_BASE_ROOT",
    "URL_BASE_MONSTERS_ROOT",
    "URL_BASE_MONSTERS_PAGE",
    "URL_BASE_MONSTER_TYPE_ICON",
    "USER_AGENT",
    "PATH_JSON",
    "urljoin",
    "parse_urls",
    "dndbeyond_session",
    "dndbeyond_monster_resources",
]

URL_BASE_ROOT = "https://www.dndbeyond.com"
URL_BASE_MONSTERS_ROOT = "/monsters"
URL_BASE_MONSTERS_PAGE = "/monsters?page="
URL_BASE_MONSTER_TYPE_ICON = "/content/1-0-2352-0/skins/waterdeep/images/icons/monsters"
USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 "
    "Safari/605.1.15"
)
PATH_JSON = Path(__file__).parent.parent / "resources" / "monster_resources.json"


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

    for link in html_soup.find_all("img"):
        url = link.get("src")
        if url is not None:
            urls.append(url)

    return urls


def dndbeyond_session(cobalt_cookie, user_agent=USER_AGENT):
    session = requests.Session()
    session.cookies.set(name="CobaltSession", value=cobalt_cookie)
    session.headers.update({"user-agent": user_agent})

    return session


def dndbeyond_monster_resources(session, min_sleep=2, max_sleep=5, reverse=False):
    html_soup = BeautifulSoup(
        session.get(urljoin(URL_BASE_ROOT, URL_BASE_MONSTERS_ROOT)).content, "lxml"
    )
    pages = [
        url for url in parse_urls(html_soup) if url.startswith(URL_BASE_MONSTERS_PAGE)
    ]
    page_count = max([int(page.split("=")[-1]) for page in pages])

    time.sleep(max(min_sleep, random.random() * max_sleep))

    dndbeyond_monsters = {}

    page_numbers = range(page_count)
    if reverse:
        page_numbers = reversed(page_numbers)

    for i in tqdm(page_numbers):
        html_soup = BeautifulSoup(
            session.get(
                f"{urljoin(URL_BASE_ROOT, URL_BASE_MONSTERS_PAGE)}{i + 1}"
            ).content,
            "lxml",
        )
        for info in html_soup.select(".info"):
            div_monster_icon = info.select(".monster-icon")[0]
            a = div_monster_icon.find("a", recursive=False)

            if a is None:
                div_type_icon = div_monster_icon.select(".type")[0]
                monster_type = [
                    monster_class
                    for monster_class in div_type_icon["class"]
                    if monster_class != "type"
                ][0]
                image_url = urljoin(
                    URL_BASE_ROOT, URL_BASE_MONSTER_TYPE_ICON, f"{monster_type}.jpg"
                )
            else:
                image_url = a.get("href")

            div_monster_name = info.select(".monster-name")[0]
            a = div_monster_name.find("a", recursive=True)
            monster_name = a.text

            with contextlib.suppress(IndexError):
                span_badge_label = div_monster_name.select(".badge-label")[0]
                monster_name = f"{monster_name} ({span_badge_label.text.strip()})"

            statblock_url = f'{URL_BASE_ROOT}{a.get("href")}'

            print(f'Adding "{monster_name}" monster data...')

            dndbeyond_monsters[monster_name] = {
                "image_url": image_url,
                "statblock_url": statblock_url,
            }

        time.sleep(max(min_sleep, random.random() * max_sleep))

    return dndbeyond_monsters


if __name__ == "__main__":
    import sys

    dndbeyond_monsters = dndbeyond_monster_resources(
        dndbeyond_session(sys.argv[1]), reverse=False
    )

    if PATH_JSON.exists():
        with open(PATH_JSON, "r") as json_file:
            monsters = json.load(json_file)

        monsters.update(dndbeyond_monsters)
    else:
        monsters = dndbeyond_monsters

    with open(PATH_JSON, "w") as json_file:
        json.dump(dict(sorted(monsters.items())), json_file, indent=2)
