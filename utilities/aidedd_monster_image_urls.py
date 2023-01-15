#!/usr/bin/env python
"""
Aide DD - Monster Image URLs
============================

This Python module retrieves the monster image URLs from
`AideDD - Monsters 5e <https://www.aidedd.org/dnd-filters/monsters.php>`__.
"""

import requests
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
    "URL_BASE_MONSTER_STATBLOCK",
    "URL_BASE_MONSTER_IMAGE",
    "PATH_JSON",
    "parse_urls",
    "parse_h1s",
    "aidedd_monster_statblock_urls",
    "aidedd_monster_name",
    "aidedd_monster_image_url",
    "aidedd_monster_image_urls",
]

URL_BASE_ROOT = "https://www.aidedd.org/dnd-filters/monsters.php"
URL_BASE_MONSTER_STATBLOCK = "https://www.aidedd.org/dnd/monstres.php"
URL_BASE_MONSTER_IMAGE = "https://www.aidedd.org/dnd/images/"
PATH_JSON = (
    Path(__file__).parent.parent / "resources" / "monster_image_urls.json"
)


def parse_urls(html_soup):
    return (
        item["href"] if item.get("href") is not None else item["src"]
        for item in html_soup.select('[href^="http"], [src^="http"]')
    )


def parse_h1s(html_soup):
    return (item.text.strip() for item in html_soup.select("h1"))


def aidedd_monster_statblock_urls(html_soup):
    statblock_urls = []
    for url in parse_urls(html_soup):
        if url.startswith(URL_BASE_MONSTER_STATBLOCK):
            statblock_urls.append(url)

    return statblock_urls


def aidedd_monster_name(html_soup):
    return next(parse_h1s(html_soup))


def aidedd_monster_image_url(html_soup):
    urls = parse_urls(html_soup)

    for url in urls:
        if url.startswith(URL_BASE_MONSTER_IMAGE):
            return url


def aidedd_monster_image_urls():
    aidedd_monsters = {}
    for statblock_url in tqdm(
        aidedd_monster_statblock_urls(
            BeautifulSoup(requests.get(URL_BASE_ROOT).content, "lxml")
        )
    ):
        html_soup = BeautifulSoup(requests.get(statblock_url).content, "lxml")
        image_url = aidedd_monster_image_url(html_soup)
        if not image_url:
            continue

        aidedd_monsters[aidedd_monster_name(html_soup)] = {
            "image_url": aidedd_monster_image_url(html_soup),
            "statblock_url": statblock_url,
        }

    return aidedd_monsters


if __name__ == "__main__":
    aidedd_monsters = aidedd_monster_image_urls()

    if PATH_JSON.exists():
        with open(PATH_JSON, "r") as json_file:
            monsters = json.load(json_file)

        monsters.update(aidedd_monsters)
    else:
        monsters = aidedd_monsters

    with open(PATH_JSON, "w") as json_file:
        json.dump(monsters, json_file, indent=4)
