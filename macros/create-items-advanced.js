/*
Create many items, the advanced way.
*/

const itemsData = [
  {
    name: "Armor Care Kit",
    price: 1,
    denomination: "gp",
    weight: 1,
    description:
      "<p>Do you depend on your armor to protect you? Ever seen a comrade-in-arms fall due to poorly maintained armor, the steel rusted, and the leather binders stiffened and worn with age? Well, that will never be your problem with our fantastic armor care kit! Coming in a stylish, yet practical, wooden box, the kit contains 3 different brushes (coarse, medium, and fine), 5 pieces of cloth, 2 vials of oil (one for rust treatment, the other for leather care) and polish for both leather and steel. These allow you to keep your armor clean and protected from the elements. For an extra 2 silver pieces, we'll also throw in our special Aurora's Water-Away grease, which will keep your armor from rusting, if applied before submerging. Simply apply and it'll provide up to an hour's worth of protection in even the briniest of saltwater seas.</p><p><strong>Aurora's Note</strong>: Using Aurora's Water-Away grease provides advantage on all saving throws against corrosion, such as that caused by the antennae of rust monsters.</p>",
  },
  {
    name: "Eversharp Oil",
    price: 1,
    denomination: "gp",
    weight: 1,
    description:
      "<p>Eversharp oil is a specially created blade oil that can be used for any edged weapon. It is slightly acidic, and eats through a very, very thin layer of metal with each application, leaving the weapon as sharp as ever. Eversharp oil comes in a glass vial with enough oil for 10 applications. Simply pour over the blade in a thin layer, leave for a minute, and then wipe off with a clean cloth, leaving your weapon ready for use, and eliminating the need for a whetstone (unless the blade is chipped, in which case we recommend first using a whetstone to clear the chip, and then an application of Eversharp oil). Eversharp oil is as flammable as lamp oil and should be kept away from open flames. Please note that if the blade is allowed to air dry, instead of being wiped clean, the dried Eversharp oil remains flammable.</p><p><strong>Aurora's Note</strong>: If air dried on a weapon, and the weapon is then ignited, the Eversharp oil catches fire and emits light as a torch for 2 rounds.</p>",
  },
  {
    name: "Mapmaking Kit",
    price: 40,
    denomination: "gp",
    weight: 10,
    description:
      '<p>Are you always losing your companions to traps that you already discovered? Ever had to exit a dungeon at a run, only to turn down the wrong corridor? Well, fret no more, as the mapmaking kit is here for you. The kits consist of 10 pages of blank parchment and 10 pages of parchment with a pre drawn grid to make cartography easier for you. Along with this, you get a series of 5 colored markers to mark your way, a measuring compass and a divider, and a steel ruler for drawing straight lines (which comes with a number of stencils for the most common markers on maps, like "danger", a compass rose, "monster here", "trap", and more). This can be customized to fit your needs at a cost of 5 sp, and a wait time for 2-3 days for the work. Furthermore, you get a goose quill or a peacock feather upgrade for 1 gp, with 3 steel nibs, and a miniature bottle of black ink. It also comes with a handy, 20-page guide on how to make maps, along with a sample map for Waterdeep and the Sword Coast, which the beginner can study from and copy in order to learn how to make a functional map. All of this comes in a wax sealed and waterproofed oaken tube for you to roll up the parchment, and an oaken case for the supplies. Extra supplies of parchment, ink, and markers can be bought at any Aurora\'s Emporium for a measly 5 sp.</p><p><strong>Aurora\'s Note</strong>: The mapmaking kit counts as cartographer\'s tools, but also gives advantage on any check made to create an accurate map.</p>',
  },
  {
    name: "Clothes, Common",
    price: 5,
    denomination: "sp",
    weight: 3,
    description:
      "<p>This outfit includes linen underwear, a baggy woolen shirt and loose breeches, or a shirt and frock, woolen hose, soft leather shoes, and a woolen hood or cap, or a straw hat. All items are of common quality.</p>",
  },
  {
    name: "Clothes, Costume",
    price: 5,
    denomination: "gp",
    weight: 4,
    description:
      "<p>Costume clothing may be flashy and colorful, gaudy, dapper, or alluring, depending on the entertainer's needs. Often their fanciful appearance hides their practical nature, and costume clothes might contain hidden pockets, be quick to change into, be reversible, and are almost always easy to move in. This outfit commonly consists of linen underwear, silk hose and a silk shirt with a skirt or breeches, a silk cap or scarf, a thin leather belt, embroidered silk cloak and gown or tunic, and embroidered silk slippers. The outfit also includes 15 silver pieces worth of costume jewelry and 2 silver pieces worth of stage makeup in clay or pewter tubs, together weighing 1 pound. The clothing is of fitted quality.</p>",
  },
  {
    name: "Clothes, Fine",
    price: 15,
    denomination: "gp",
    weight: 6,
    description:
      "<p>This outfit consists of linen underwear, woolen hose, soft, thin leather shoes, a woolen underdress, breeches, or long undershirt, a richly embroidered woolen gown or tunic, a long woolen girdle or leather belt, and a woolen cap or silk headdress. The outfit is completed with an embroidered woolen cloak. All items are of fine quality.</p>",
  },
  {
    name: "Clothes, Traveler's",
    price: 2,
    denomination: "gp",
    weight: 4,
    description:
      "<p>Traveler's clothes are sturdy and practical. They are made of thicker, breathable materials. This outfit consists of linen underwear and an undershirt, thick leather boots, a woolen shirt, skirt, or breeches, a thick leather belt, a cotton shirt, a woolen coat or jacket, and a woolen cloak with a hood. All items are of fitted quality.</p>",
  },
  // {
  //   name: "Belt",
  //   price: 7,
  //   denomination: "cp",
  //   weight: 0.1,
  //   description:
  //     "<p>A band of material worn around the waist. Belts include a metal belt buckle. Coin pouches, component pouches, scabbards, and quivers can be hung from a belt. A baldric--a belt worn over one shoulder to carry weapons-- is equivalent to a belt.</p>",
  // },
  // {
  //   name: "Boots",
  //   price: 1,
  //   denomination: "gp",
  //   weight: 0.6,
  //   description:
  //     "<p>Boots are a specific kind of shoe that cover the foot and ankle and usually have a distinct heel. Some boots cover the calves and knees. Hard-wearing leather boots are preferred by travelers, laborers, and soldiers, while boots of felted wool are common everyday wear indoors.</p>",
  // },
  // {
  //   name: "Breeches",
  //   price: 14,
  //   denomination: "cp",
  //   weight: 0.4,
  //   description:
  //     "<p>Breeches cover the legs from the waist down to below the knees or ankles. They are closed at the bottom by buckles and straps or drawstrings.</p>",
  // },
  // {
  //   name: "Cap",
  //   price: 1,
  //   denomination: "sp",
  //   weight: 0.2,
  //   description:
  //     "<p>A hat. Caps come in many different styles and fashions.</p>",
  // },
  // {
  //   name: "Cloak",
  //   price: 2,
  //   denomination: "sp",
  //   weight: 1,
  //   description:
  //     "<p>A loose-fitting garment that is worn over other clothing to protect the wearer from the elements or as part of a uniform or fashionable outfit. Cloaks may have an integrated hood at no extra cost.</p>",
  // },
  // {
  //   name: "Coat",
  //   price: 4,
  //   denomination: "sp",
  //   weight: 0.8,
  //   description:
  //     "<p>A coat is worn over the upper body, and typically has long sleeves and a skirt or tails that extend down to or below the knees. Most coats are open down the front and can be closed with straps and buckles, hooks and loops, or buttons. A coat may have an integrated hood at no extra cost.</p>",
  // },
  // {
  //   name: "Gown",
  //   price: 5,
  //   denomination: "sp",
  //   weight: 3,
  //   description:
  //     "<p>A gown, or robe, is a loose outer garment that extends down to the knees or ankles.</p>",
  // },
  // {
  //   name: "Headdress",
  //   price: 1,
  //   denomination: "sp",
  //   weight: 0.2,
  //   description:
  //     "<p>Any item of clothing worn on the head. Headdresses may be functional, fashionable, part of a uniform, a symbol of status, or worn out of respect for customs and social etiquette.</p>",
  // },
  // {
  //   name: "Hood",
  //   price: 1,
  //   denomination: "sp",
  //   weight: 0.2,
  //   description:
  //     "<p>A soft head covering, including hoods with a short mantle and many types of hijab. Outer garments, like coats and cloaks, may have an integrated hood.</p>",
  // },
  // {
  //   name: "Hose",
  //   price: 2,
  //   denomination: "cp",
  //   weight: 0.4,
  //   description:
  //     "<p>Fitted leggings that cover the feet, legs, and lower body from the waist down. They may be made of differently colored sections. They are worn with breeches, or under a skirt or gown, or with the crotch covered with a codpiece.</p>",
  // },
  // {
  //   name: "Jacket",
  //   price: 4,
  //   denomination: "sp",
  //   weight: 0.8,
  //   description:
  //     "<p>A jacket reaches to the waist, has long sleeves, and is open at the front. Most can be fastened with buttons or hook and eye fasteners.</p>",
  // },
  // {
  //   name: "Material, Yard",
  //   price: 6,
  //   denomination: "sp",
  //   weight: 1,
  //   description:
  //     "<p>Aurora's Whole Realms Emporium sources the finest material from across Faerûn. Each yard consists of three-square-feet of cloth. A typical bolt of material consists of 50 yards of cloth.</p>",
  // },
  // {
  //   name: "Sash",
  //   price: 7,
  //   denomination: "cp",
  //   weight: 0.1,
  //   description:
  //     "<p>A sash is a wide band of material worn around the waist, over one shoulder, or over both shoulders like a necklace.</p>",
  // },
  // {
  //   name: "Scarf",
  //   price: 1,
  //   denomination: "sp",
  //   weight: 0.2,
  //   description:
  //     "<p>A scarf or shawl is worn around the neck or covering the head.</p>",
  // },
  // {
  //   name: "Shirt",
  //   price: 14,
  //   denomination: "cp",
  //   weight: 0.4,
  //   description:
  //     "<p>An undergarment worn over the upper body. It may have short or long sleeves, while vests are sleeveless shirts.</p>",
  // },
  // {
  //   name: "Tunic",
  //   price: 5,
  //   denomination: "sp",
  //   weight: 3,
  //   description:
  //     "<p>A loose-fitting undergarment worn over the upper body, which can extend down past the waist or knees. Tunics may have short or long sleeves or be sleeveless.</p>",
  // },
  // {
  //   name: "Shoes",
  //   price: 5,
  //   denomination: "sp",
  //   weight: 0.5,
  //   description:
  //     "<p>Shoes are worn on the feet. They come in many styles and are worn to protect the feet but also as a fashion item. Shoes may have laces, buckles and straps, or button fastenings. Shoes generally have a thin or thick leather sole, which is not modified by price or weight modifiers.</p>",
  // },
  // {
  //   name: "Skirt",
  //   price: 14,
  //   denomination: "cp",
  //   weight: 0.4,
  //   description:
  //     "<p>Skirts come in a wide variety of styles, such as sarongs, sompots, and kilts. Skirts are worn around the waist and can be of any length.</p>",
  // },
  // {
  //   name: "Slippers",
  //   price: 5,
  //   denomination: "sp",
  //   weight: 0.5,
  //   description:
  //     "<p>Slippers are shoes that generally don't have fastenings and are intended for indoor use.</p>",
  // },
  // {
  //   name: "Undershirt",
  //   price: 1,
  //   denomination: "sp",
  //   weight: 0.2,
  //   description: "<p>Underwear worn on the upper body.</p>",
  // },
  // {
  //   name: "Undershirt, Long",
  //   price: 14,
  //   denomination: "cp",
  //   weight: 0.4,
  //   description:
  //     "<p>A longer undershirt that reaches down below the knees and is worn under a gown or robe. Chemise, nightshirts, shifts, and smocks are forms of long undershirts.</p>",
  // },
  // {
  //   name: "Underwear",
  //   price: 5,
  //   denomination: "cp",
  //   weight: 0.1,
  //   description:
  //     "<p>Garments generally worn under outer clothing or to protect or cover genitalia. Codpieces, loincloths, braies, and braccae are all forms of underwear.</p>",
  // },
  {
    name: "Chicken Rolls",
    price: 5,
    denomination: "cp",
    weight: 1,
    description:
      "<p>This sounds like a bit of a weird one, but hear me out. This dish consists of a delectable bun, rolled up and allowed to rise for at least an hour. Once the bun has reached a good size (about the size of a child's fist) you flatten it like a pancake. Once that is done, you put it aside, while you mix the pre-packaged spices with minced meat. Any minced meat will do, except goat--goat gives it a horrible taste, but chicken or poultry generally works best. Into the middle of this pancake you place a dollop of the mince. Then you roll the pancake closed and stick it in an oven until it has reached a golden-brown color. If you lack the oven, simply put it on a steel plate (for adventures, a steel shield serves nicely for this dish), and place it in an open fire--but make sure that the flames cannot reach the bun directly. Once it's done, allow it to cool to a lukewarm temperature, stick it in a basket, and head off to your favorite campsite.</p><p><strong>Aurora's Note</strong>: The package contains enough powder to make 10 rolls. All you need to do is add about 30 oz of water and the minced meat, to your liking.</p>",
  },
  {
    name: "The Fullness",
    price: 1,
    denomination: "gp",
    weight: 20,
    description:
      "<p>The fullness is just that. Something to make your entire family full. Bought fresh from Aurora's, it consists of the following: 1) Bread freshly made from local ingredients with your choice of either a Calimshan spiced bread or a sugared loaf from Aglarond. 2) Five different toppings, including strawberry marmalade, ham, spiced sausage, boiled and poached egg, and honey. 3) Half a gallon of milk, and half a gallon of freshly squeezed orange juice. 4) Chocolate cake--enough for 3 servings for 8 people. 5) Cream and fresh strawberries. All beverages and toppings are kept cool with some of our proprietary glacier stones (see the Aurora's Whole Realms Summer Catalogue for details). This comes with a sturdy basket for carrying the goods, as well as a cotton blanket for you to sit on and take in the spring scenery as you enjoy your meal.</p>",
  },
  {
    name: "Phlan Custard Mix",
    price: 1,
    denomination: "sp",
    weight: 0.2,
    description:
      "<p>We put the fun in Phlan custard! Our exciting product is a delicacy native to Phlan, and a symbol of open defiance of its various occupations, Phlan custard is a historic culinary tradition. Crafted like a pie or tart, the Phlan custard was often made to conceal secret messages, jewelry, or even small objects such as keys. Necessary in the times of occupation, many of Phlan's conquerors over-looked the otherwise innocuous confection. In this, we celebrate the time-honored defiance in Phlan by bringing you this delicious custard treat! Our powdered mix makes it possible for you to enjoy Phlan custard year-round, provided you have an oven and a few extra ingredients.</p><p><strong>Aurora's Note</strong>: Don't be afraid to get creative! Each box has a basic Phlan custard recipe, but we often provide a few variations in our seasonal recipe catalogues. Send in your Phlan custard recipes and we may even feature it and gift you a coupon for your next food purchase!</p>",
  },
  {
    name: "Powdered Strawberry",
    price: 1,
    denomination: "sp",
    weight: 1,
    description:
      "<p>Bring spring cheer into any time of year! The anticipation of that sweet fruit flavor can be yours in rain or snow. Simply apply powdered strawberry to any confection. Add it to a beverage like water or milk. Use it in baking. But best of all, take a spoonful for a little pick me up when you're feeling blue. Our powdered strawberry recipe is made to avoid spoiling and can last for years while sealed in our patented dry container. As an added treat, consider using a bit in your next Phlan custard. We've heard it's a great combination!</p><p><strong>Aurora's Note</strong>: Please do not inhale powdered strawberry. Do not add powdered strawberry to beer, and refrain from using it in hard liquor unless you are a trained mixomancer. Powdered strawberry is not a cure for sadness, but we think it helps a little.</p>",
  },
  {
    name: "Air Screw",
    price: 75,
    denomination: "gp",
    weight: 26,
    description:
      "<p>My improved air screw is far more likely to carry one into the ether. Sit on the air screw's bench, then turn the crank with your feet. This will cause the large canvas screw above you to rotate and begin to lift you into the air, provided the motion of your legs is vigorous enough. An air screw has the vehicle stats given below.</p>",
  },
  {
    name: "Bridge, Folding",
    price: 3,
    denomination: "gp",
    weight: 6,
    description:
      "<p>This 12-foot-long bridge is made of connected sections. Roll it out, then flip it over and the sections become one long ridged structure. The folding ridge comes inside a handy sack. I suggest that no more than one person cross it at a time. I can also make a folding ladder for you of the same length. I can extend the length of either contraption for a meager sum of 5 silver pieces per additional 5 feet. Attempt an unmodified DC 3 saving throw every round when a creature is crossing the bridge, +2 for every additional 5 feet of length and +4 for each additional Medium or larger creature on the bridge. On a failure the bridge breaks and all creatures on the bridge take falling damage.</p>",
  },
  {
    name: "Clock",
    price: 75,
    denomination: "gp",
    weight: 2,
    description:
      "<p>I still make my highly accurate time pieces with springs and gears, winders, or pendula. They are exact, and far more accurate than relying on the passage of the sun across the sky or granules of sand in an hourglass. Clocks range in price from 75 gold pieces up. A clock loses 1 hour of time after a number of days equal to the price of the clock.</p>",
  },
  {
    name: "Diving Hood",
    price: 30,
    denomination: "gp",
    weight: 2,
    description:
      "<p>My diving hood has proven popular with pearl hunters. Attach the mask to your face and be sure that the hose running to the float above does not come loose or get tangled. I have integrated goggles with the mask, so now you can see while you're underwater too. The diving hood allows you to breathe air through the hose attached to the surface float, up to a depth of 20 feet.</p>",
  },
  {
    name: "Flapping Bird",
    price: 5,
    denomination: "cp",
    weight: null,
    description:
      "<p>This small bird is made of canvas and wire. Wind the lever several times, then release it, and it will fly, just like a tiny bird of the air. A flapping bird flies [[/r 1d4 * 5]]  feet into the wind, or [[/r 1d6 * 5]] feet with the wind. It can carry a small slip of paper.</p>",
  },
  {
    name: "Tentfall",
    price: 25,
    denomination: "gp",
    weight: 4,
    description:
      "<p>My ingenious tentfall is made of linen that forms a pyramid with a base of twelve-yards-squared. Simply hold onto the ring suspended from the tent and jump from any height, you will land quite safely.Holding onto a tentfall reduces the rate of a fall to 20 feet per round. You take falling damage only from the number of feet you fell during the round, and only half of this if you are still holding onto the tentfall. At the start of a round, you must succeed on a DC 16 Strength check to maintain your grip on the tentfall or take falling damage as usual.</p>",
  },
  {
    name: "Handle, Multi-Purpose",
    price: 8,
    denomination: "sp",
    weight: 4,
    description:
      "<p>Do you find yourself defending your home? Keep an innocuous tool at your disposal for such purposes! The multi-purpose handle is made with several attachments, including heads for hoeing, raking, and even a handy shovel. But what makes the multi-purpose handle even more special is that it is a weapon's-grade quarterstaff! Hidden in plain sight, this tool can save your life. Especially handy for traveling gardeners and shrubbers!</p><p><strong>Aurora's Note</strong>: The multipurpose handle attachments are not meant to be used as weapons and are likely to break in combat. The handle itself is guaranteed to retain its ability as a weapon even if the attachment should snap off. However, due to popular demand, we are considering a martial version of this item. Keep an eye on our future catalogues!</p>",
  },
  {
    name: "Hoe",
    price: 4,
    denomination: "sp",
    weight: 2,
    description:
      "<p>Soften the earth in preparation for the harvest! A hoe is an especially handy tool that will make gardening and simple farming even simpler! Our outstanding model is created with a special manufacturing technique we call \"partial tang\" construction. The head of the hoe is grafted into the wooden handle, so you can swing away without any fear of a free flying hoe handle! But wait, that's not all. Our sturdy hoe will withstand rain, sun, wind, and all the vicissitudes of the hard work you will put it to in tending the land.</p>All official Aurora's hoes include our lifetime repair warranty. A mostly intact Aurora's hoe can be fixed or replaced at any of our centers for as little as 5 copper pieces!",
  },
  {
    name: "Rake",
    price: 5,
    denomination: "sp",
    weight: 1,
    description:
      "<p>Raking is an important pastime, whether it is for beautification or to enhance the efficiency of your garden or farm. Use our sturdy rakes, and you will be raking leaves, not worries! With our specially crafted rakes you won't ever have to worry about stepping on one. Our rakes are angled to prevent sudden rake-step related injuries. Ask one of our representatives to demonstrate its safety today!</p>",
  },
  {
    name: "Shears, Gardening",
    price: 6,
    denomination: "sp",
    weight: 1,
    description:
      "<p>What fun you'll have with these shears! Made specifically for gardening, our thoroughly tested stay-sharp shears are surely sheer pleasure. The handles have been smoothed and treated to avoid splintering and corrosion, and best of all, the hinge mechanism has been treated with an antirust coating! Enjoy many hours of carefree time in your garden, worrying less about your shears, and more about your flowers and shrubberies!</p><p><strong>Aurora's Note</strong>: Anti-rust coating will not protect against rust monster attacks. Please cease inquiries regarding the purchase of our secret anti-rust recipe!</p>",
  },
  {
    name: "Shovel, Budget",
    price: 2,
    denomination: "sp",
    weight: 1,
    description:
      "<p>Need to dig a ditch in a jiffy? We've got you covered! This excellent and lightweight shovel is all you need for your home gardening needs. Though we don't recommend it for a farm or large garden, the budget shovel is something that should be in every home. It is also excellent for outfitting large groups for big projects, especially excavations and archeological ventures. We sell the budget shovel in several patterns and designs, and our special comfort grip means that you'll enjoy many hours of digging, without the blisters. Have fun moving earth, and remember, a budget item means a happy coffer!</p>",
  },
  {
    name: "Shovel, Reinforced",
    price: 8,
    denomination: "gp",
    weight: 4,
    description:
      "<p>Digging is next to godliness when it comes to working in the soil of your farm or garden. Let us improve your proximity to divinity by providing you with our reinforced shovel! Using methods that have been tested in the harshest of environments, we have perfected the robust shovel. We are so confident in our claims that you can use it as a weapon! We invite you to ask for a demonstration at a local store, or even invite one of our door-to-door sales-folk to come to your home and bring the demonstration to you!</p><p><strong>Aurora's Note</strong>: We are so confident in our shovel that we have provided the Waterdeep royal gardeners with these excellent tools. They have since formed an honor guard and call themselves the shovel knights. Make sure you see them at the next royal parade! Treat a reinforced shovel as a battleaxe but without the versatility weapon property.</p>",
  },
  {
    name: "Smock, Gardener's",
    price: 3,
    denomination: "sp",
    weight: 1,
    description:
      "<p>It's important to get dirty while gardening. It's the sense of connection with the natural world, and the toil that brings satisfaction to you and those with whom you share your garden! But don't fret! Our gardener's smock is the perfect cover-all. Created to withstand hours upon hours of gardening work, our smock will take up the dirt and wear for you! Best of all, our rugged colors and patterns mean that you can treat it roughly, wash it vigorously, and it will hardly fray or tear! Should it start to come apart, please bring your smock into one of our repair departments, where a handy hedge magician will mend it for you!</p>",
  },
  {
    name: "Trowel",
    price: 1,
    denomination: "sp",
    weight: 1 / 2,
    description:
      "<p>The right tool for the right job! Our trowels are made with love, and you will love how well they work! Our special toothed design means that you won't need to sharpen it. We are extremely confident in our design, and we will replace the handle for 1 copper piece, or the head for 3. Buy now, and we will throw in a trowel holster for 2 copper coins, with free engraving!</p>",
  },
  {
    name: "Waders, Child's",
    price: 1,
    denomination: "sp",
    weight: 1,
    description:
      "<p>Just the thing to teach your child to fish, or just keep them mostly clean from the mud. These waders are a special brand of overall that cover feet, legs, and torso, and keep your lower three-quarters dry while wading in water. Our special material will keep the moisture off, while keeping the fun intact! Just remember to check that water depth.</p>",
  },
  {
    name: "Watering Can",
    price: 5,
    denomination: "cp",
    weight: 1,
    description:
      "<p>Growing your garden means providing the essence of life. We can help you to provide life with our amazing and budget-friendly watering can. We apply our special no-rust coating to this item, because we care.</p>Water and metal have never been happier together! Water your plants with minimal stress, so that your gardening can be carefree and fun!",
  },
  {
    name: "Flower Basket",
    price: 4,
    denomination: "cp",
    weight: 2,
    description:
      '<p>The simple flower basket is often overlooked by lovers and those wishing to get themselves (back?) into the good graces of their partners. It is a simple gesture, one that can say both "I\'m sorry" and "I love you" without any words needing to be exchanged. Our baskets are made from reeds from the banks of Mulhorandi rivers, skillfully woven by experts to create these lightweight, but strong baskets. We have then picked the finest and prettiest flowers that we can find, and alchemically preserved them (guaranteed to last at least a week!), so that you can bring them to your loved ones. Roses are always popular, as are lilies and tulips, so these are most often available, but every country has its own traditions, and we strive to accommodate these wherever we can.</p>',
  },
  {
    name: "Love Chocolate",
    price: 4,
    denomination: "cp",
    weight: null,
    description:
      "<p>Love chocolate is made from the finest Maztican cocoa beans. This chocolate, in particular, is made from the strain that's grown in Amn, as it has a better taste when turned into sweet treats. The chocolate is molded into a big heart-shape and placed inside a decorated box. When the box is opened, a minor glamor explodes and a pink heart appears, made of sparkles that hangs in the air for a minute while a tender love tune plays.</p>",
  },
  {
    name: "Love-Is-In-The-Air",
    price: 5,
    denomination: "sp",
    weight: null,
    description:
      '<p>These incense sticks are bright pink and filled with the aromas of love. These vary from region to region, but our two most favorite scents are "Love and Learn" which is preferred by the younger crowd and which is a mixture of lotus flowers from the far kingdoms of Kara-tur mixed with lavender. It creates a scent that will forever after remind you of the spring days spent with your first love. The other favorite comes to us from Tethyr, where "Heavy Heart" mixes amber and vanilla into a heady mix that will set your senses ablaze with passion. These two are available at any Aurora\'s Emporiums, but several others might be available. Please ask your local clerk for details. Not only do these incense sticks come with the above scents, but they also produce a mood-light second to no other. This can be of any color that you choose, but you should ask your clerk for availability. The standard color for this is red. Both the scent and light will last for an hour.</p><p><strong>Aurora\'s Note</strong>: Burning a Love-Is-In-The-Air incense stick reduces or increases the light conditions in a 5-foot radius to dim light, regardless of the ambient light. This has no effect on a darkness spell or light from a magical source.</p>',
  },
  {
    name: "Spring Parasol",
    price: 1,
    denomination: "gp",
    weight: 1,
    description:
      "<p>The spring parasol is the perfect accompaniment for the young lady or young man who wishes to remain both stylish and dry when the inevitable spring showers hit. Made from strong, but fine Durpari cotton, stretched across bamboo from Karatur, the resultant structure is both flexible and durable. When stretched, the cotton is then hand-painted by the best artists that Aurora's Emporium employs, creating unique Aurora's designs, making them instantly recognizable. For a further 10 gold pieces, you can choose your own design, but this does take a few days to provide, depending on the design's complexity. The final design is then waterproofed with our special alchemical formula, rendering it water resistant. With our spring parasol, you'll be able to \"strut your stuff\", no matter the weather.</p>",
  },
  {
    name: "Sting-Bee-Gone",
    price: 1,
    denomination: "sp",
    weight: 1,
    description:
      "<p>Sting-Bee-Gone was developed on the Moonshae Islands by some of the druids worshipping the Earthmother there. They were asked by local beekeepers if there was a druidic alternative to the bulky and expensive beekeeping suits they used (also available from Aurora's Emporium, at a cost of 10 gold pieces per suit). Sting-BeeGone is that solution. It is a cream that you spread across any exposed skin, typically your hands, arms, and face. It consists of a thick, greasy whale fat that has been mixed with crushed cloves. It has then been smoked in a wood stove for several hours, giving it a distinctive smell that bees (and most other insects) find repellant. It will keep you safe for hours when working in an area full of bees, wasps, or other stinging insects. Sting-Bee-Gone comes in a small jar with enough ointment for 10 full-body applications for a normal human.</p><p><strong>Aurora's Note</strong>: Please note that the protection does not necessarily extend to intelligent insectile life. Like other creatures, they may decide to aggressively remove any smell that they find offensive. Any attempt to use the product in this manner leaves the maker's guarantee null and void.</p>",
  },
  {
    name: "Swell-Away",
    price: 1,
    denomination: "sp",
    weight: 0.125,
    description:
      "<p>If you are one of those rare individuals that despairs at spring time, we have something for you! You probably dread the blooming of flowers and the spring breeze, but belay your concerns! We have created a wonderful tincture that can minimize or remove that awful sniffling and swelling that comes with the winds of spring! Now you too can carouse and gambol with the best of them in a season meant for carefree fancy! Just make sure you plan a half hour before exposure to the outdoors to minimize discomfort! Each bottle holds enough doses for three ten-days!</p>",
  },
  {
    name: "Plague Mask",
    price: 100,
    denomination: "gp",
    weight: 3,
    description:
      "<p>Hopefully, this item will not be one that you ever need to use, but in case of an outbreak or having to enter an area with dangerous gas, this is the item you want more than any other. It consists of a heavy leather mask, in the shape of a crow or other carrion bird's beak, with a special compartment in the beak area for you to place herbs and spices that'll remove any unpleasant smells. More importantly, the beak and the mask itself contain an alchemically treated cloth that makes it much more difficult for spores and the like to penetrate the mask and enter the wearer's lungs. Completed with a set of lenses, which can be either transparent or black at the customer's request, the plague mask provides protection against many diseases and noxious fumes. Unfortunately, due to their ghoulish appearance and their connection with pestilence and death, many of the populace see wearers of such masks as little more than badly disguised scavengers. A single filter works for 24 hours. New filters are easily replaced, and costs just 2 copper pieces each. Should the lenses break, Aurora recommends that the entire mask is replaced. <strong>Aurora's Note</strong>: This mask gives advantage on saving throws against inhaled or air bases poisons and diseases. Due to the stigma attached to the mask, anyone wearing it gets disadvantage on all Charisma based checks. Using the mask for more than 24 hours, whether continuous or not, renders it inactive until the filter is replaced.</p>",
  },
  {
    name: "Purse-Cutter Blade",
    price: 1,
    denomination: "gp",
    weight: null,
    description:
      "<p>This tiny, easily concealed blade attaches to the finger of the user through the means of a small band and is honed to razor sharpness. Originally created for doctors and surgeons that needed extra precision with their instruments, it was quickly adapted by less-savory types, and used for opening purses and bags without the owner knowing it, hence the name. We here at Aurora's Emporium honor the tradition of the doctors and surgeons, and anyone purchasing this item will be forced to swear to the intended usage of the blade in question.</p><p><strong>Aurora's Note</strong>: Using the purse-cutter blade gives you advantage on Dexterity (Sleight of Hand) checks when trying to lift a purse or steal the coins inside it. You also have advantage on Dexterity (Sleight of Hand) checks when trying to conceal the pursecutter blade. If used as a weapon, treat it as a dagger that only deals 1 point of damage and does not benefit from your Strength bonus. It can still benefit from your Dexterity score, as it has the finesse quality. Furthermore, it does no damage when thrown.</p>",
  },
  {
    name: "Sandsole Shoes",
    price: 10,
    denomination: "gp",
    weight: 2,
    description:
      "<p>Sandsole shoes are a specialized pair of sandals, made with strong leather straps and the hardest darkwood you can find. A series of small canvas bags are sewn underneath the wooden soles of the sandals, each of which is filled with the finest sand that Anauroch has to offer. This allows for almost totally silent movement across surfaces, all while doing so in complete comfort. These shoes find their home in the libraries of Candlekeep and have become popular as far as the Underdark, where they are worn by those wishing to move about without the risk of being heard.</p><p><strong>Aurora's Note</strong>: Sandsole shoes give the wearer advantage on Dexterity (Stealth) checks made against being heard when moving across surfaces such as loose gravel or broken glass.</p>",
  },
  {
    name: "Seedbarrow",
    price: 5,
    denomination: "sp",
    weight: 10,
    description:
      "<p>A seedbarrow is a particular version of a wheelbarrow, one designed to lower the time needed for you to sow your seeds in the field. It's built from sturdy wood, but has two wheels at the front, set closely together. While this makes it more difficult to turn the seedbarrow, it also makes it more stable when moving it across the field. At the back is a fold-out system consisting of a small chute and pipes, that scatter seed over a 10-feet wide area behind the seedbarrow. When filled with seed or grain, the seedbarrow is then rolled along the field--depending on your crop density you can either do this at a leisurely pace or a near-run--and then seeds will gently roll down the chutes and deposit themselves in the tilled soil. This works best for grain-type crops like wheat, rye, and so on, but any seed crop can be sown in this manner.</p><p><strong>Aurora's Note</strong>: The seedbarrow generally increases crop yields by 20%, at a 5% increase in cost to seed a field. As any good farmer will tell you, the actual yield will also depend on water, wind, and sun conditions and cannot in any way be guaranteed.</p>",
  },
  {
    name: "Skinning Kit",
    price: 3,
    denomination: "gp",
    weight: 4,
    description:
      "<p>This sleek, roll-up leather tool holder includes everything you need to properly skin and prepare animals for fur, meat, or even descaling! No hunter should go without this kit, and no out-doorsman should pass up this amazing set of tools. In addition to a myriad of knives, hooks, and other implements for handling game, there are several special towels and cleaning liquids included to keep your hands and tools as clean as possible. Keep yourself looking rugged, without the grime. But that's not all! While supplies last, each purchase will come with a survival booklet written by some of our most famed explorers and trappers, so you will get expert advice on how to use your new kit. Already know how to skin game? Give the book to a youngster and get them interested in the hunt! Are those horns you hear? The hunt calls!</p>",
  },
  {
    name: "Tightrope Shooter",
    price: 50,
    denomination: "gp",
    weight: 8,
    description:
      "<p>A tightrope shooter is a specialized type of crossbow. It is the same size as a light crossbow, but it has a winch attached to the rear of it and is reinforced with steel, allowing it to be used as an anchor. It needs a series of specialized bolts, designed to punch through inanimate material, using a specially treated steel bolthead that makes it almost as strong as adamantine. Attached to the back of the bolt is a silk rope that extends 65 feet back. This is often used by acrobats and circus performers when setting up a new show, but many adventurers have found the tightrope shooter to be immensely valuable when having to cross gorges or pitfalls in dungeons. Each purchase of the tightrope shooter comes with five bolts. A new case of 5 bolts can be purchased separately at 10 gold pieces. Please note that, due to the unique properties of the bolts, they cannot be reused. The bolts come attached to the silk rope needed.</p><p><strong>Aurora's Note</strong>: When shot at a wall or other suitable feature and anchored properly (requiring a normal attack roll to hit, and a successful DC 5 Strength check), the rope extends tautly across, allowing for a user to either tightrope walk or shimmy along the rope. Provided the anchoring target can hold the weight, the rope can hold up to 300 pounds. If shot at a creature, the creature counts as being grappled until the bolt is dislodged, which requires a DC 15 Strength check or a DC 10 Wisdom (Medicine) check. Dislodging it using a Strength check causes [[/r 1d4]] slashing damage. If fired using normal crossbow bolts, treat the tightrope shooter as a light crossbow.</p>",
  },
  {
    name: "Tree Tent",
    price: 5,
    denomination: "gp",
    weight: 10,
    description:
      "<p>The tree tent is a small, teardropshaped tent made from sturdy canvas and leather, that can be hung from a strong tree branch. Its opening has wooden fasteners that, when closed, creates a small cocoon in which two human-sized people can comfortably sleep, suspended well off the ground and in comparative safety. Created for portability, the tree tent can be assembled or disassembled in approximately half an hour by an unexperienced camper, while an experienced camper can accomplish the same feat in about 10 minutes. The tent comes with instructions printed on a piece of parchment, and the clerk will arrange for a free demonstration to explain how to set up and take down the tree tent.</p><p><strong>Aurora's Note</strong>: The tree tent can hold 2 Medium-sized creatures, 4 Small-sized creatures, or 1 Large-sized creature. More weight causes the tree tent's tether to snap after [[/r 1d6]] hour, potentially causing falling damage to anyone inside the tent.</p>",
  },
  {
    name: "Tree Trimmer",
    price: 1,
    denomination: "gp",
    weight: 3,
    description:
      "<p>A tree trimmer, or Druid's Friend, is a specialized tool for tending and pruning trees, normally in the process of husbanding a forest. The tool consists of a pair of Lantaninspired shears, that are spring-loaded to increase the tool's cutting strength. This 10-foot pole has a gripper hand at the other end, which is normally used to grab dead branches and loosen them, or to shake fruit from branches--often popular in Autumn. In the city, this particular tool has also become popular among less savory types, and is known as a \"nabber\", allowing scoundrels to reach items that they would not normally be able to, such as the purses of rich merchants on balconies, or even simple clothes that have been hung to dry, strung up on a clothesline.</p><p><strong>Aurora's Note</strong>: The tree trimmer's gripper end allows a user to perform a Dexterity (Sleight of Hand) check up to 10 feet away, though anyone doing so gets disadvantage on the check due to the ungainly nature of the tool.</p>",
  },
  {
    name: "Clay Marbles",
    price: 5,
    denomination: "cp",
    weight: 1,
    description:
      "<p>Playing marbles is a wonderful pastime that can occupy many a youth in a wholesome competition and social gathering. Our wonderful marbles come in all sizes and colors, but only one shape! We pride ourselves in a uniformly spheric marble that will roll the right way until it breaks. That's our guarantee! Through our own production method, we can not only guarantee quality, but style, as we provide patterns and even specially made artistic decorations so that no two marbles in a bag are alike! Let your child join one of our sponsored marble leagues, and we'll even waive the first entry fee with the bag's purchase! This one's for all the marbles!</p>",
  },
  {
    name: "Crate",
    price: 2,
    denomination: "cp",
    weight: 4,
    description:
      "<p>This lovely and elegant crate was crafted from a fine and sturdy wood and made to last! We bring you the very same crates we use to ship our impressive array of goods around the realms, and all for the enjoyment of your youngsters! Watch in awe as your child develops creative play based around the crate. Help them construct forts and other fun objects from multiple crates! Teach them to responsibly use a crate as a stepstool! The possibilities are as endless as the imagination of your child! As a special limited time offer, if you order 20 pounds of goods or more at once, we will throw in a crate at no extra charge!</p>",
  },
  {
    name: "My First Garden",
    price: 3,
    denomination: "sp",
    weight: 3,
    description:
      "<p>You are never too young to start a garden. A seed in a cup of soil or a small plot of root vegetables are all fine candidates for beginning an interest in gardening. But why settle for a plot or a cup of soil? We can provide you with a wonderful kit for your youngster to start growing all manner of flowers, vegetables, and even a few fruits! Our kit includes a small wooden shovel, a tin pail, seeds, a bag of nutrient rich soil, and a small booklet of gardening facts. And don't worry, we sell an adult version for those of you novices, so don't feel bad if it's your first time gardening,</p>",
  },
  {
    name: "Puppet Pal",
    price: 3,
    denomination: "sp",
    weight: 0.25,
    description:
      "<p>These simple and detailed felt hand-puppets are all the rage! Our line of puppets ranges from some of the most beloved personalities around the Sword Coast, to some of the most fearsome creatures that roam the realm. A certain mage that carries a black staff is available for a short time, as well as our special twohanded ettin puppet for you advanced puppeteers! But hurry, we only produce certain puppets in limited quantities, and when they are gone, they are gone! Don't fret, though, as we have a selection of evergreen puppets for your collecting and entertainment needs. Ask us about our specials on goblins and kobolds! Delight your friends with a puppet pal today!</p><p><strong>Aurora's Note</strong>: Any resemblance to peoples living, dead, undead, or in some other state of animation is purely coincidental. Monster puppets are not meant to inform on anatomical or strategic weaknesses of monsters. Buyer assumes responsibility for all harm caused by annoying puppet performances</p>",
  },
  {
    name: "Tin Whistle",
    price: 2,
    denomination: "cp",
    weight: 0.25,
    description:
      "<p>Bring a little music into the lives of your children. A little musical skill can improve their lives greatly, and there is no better way to learn the basics than with a tin whistle. Our tin whistles are made with love to ensure quality and include a mini-music sheet for your youngster's first concert! Consider starting your young musician on the path to performing with the time honored and long beloved instrument, now. You can't beat the price!</p><p><strong>Aurora's Note</strong>: Tin whistles bend easily and are prone to going out of tune after prolonged use. We can either fix or replace a tin whistle once, free of charge. We can also offer a discount on a more challenging instrument if your musician is ready for something more substantial. Inquire today!</p>",
  },
  {
    name: "Wooden Sword",
    price: 1,
    denomination: "sp",
    weight: 1,
    description:
      "<p>A wooden sword is perfect for pure childlike joy or as encouragement for that young squire in your family. We sell a handsome wooden sword that can be used for training, or just for fun! Try a replica of a famous weapon. All our models are balanced and weighted to help prepare your youngster for the real thing! But remember, even a wood sword hurts.</p><p><strong>Aurora's Note</strong>: Our wooden swords are not meant to be true weapon and are prone to breaking in combat situations. Please do not rely on this for anything other than an improvised implement. For a combat grade wooden sword, please see our weapons catalogue for our specially shaped clubs.</p>",
  },
  {
    name: "Haversack of Convenience",
    price: 7,
    denomination: "sp",
    weight: 1,
    description:
      "<p>The only haversack you'll ever need to buy! We have created something that is as good as it gets without magic! But wait, our haversack is full of exciting surprises. It has extra pockets, expanding pockets, and hidden compartments. Moreover, our haversack comes with a customized add on feature. Do you want to attach a quiver? We have you covered. Do you want a weapon strap? We can do that! Would you like to have an easy to reach component pouch expansion? We'll even throw the components in for free! Ask us about our haversack, and we think you'll find it to be rather convenient.</p><p><strong>Aurora's Note</strong>: This haversack is not \"handy\" and cannot be described as \"handy\". Any resemblance to handy haversacks is purely coincidental. Please do not misrepresent our product as anything other than a haversack of convenience.</p>",
  },
  {
    name: "Gondroller",
    price: 450,
    denomination: "gp",
    weight: 40,
    description:
      "<p>We have secured a contract with the Church of Gond and can now, officially, bring you an official Gondroller! These two-wheeled devices come with actuator pedals that allow you to self-propel down one of the many city streets throughout Faerûn! While they are currently only available in stores in Waterdeep, Neverwinter, and Suzail, special orders are available on a limited basis. Don't settle for a knock off, don't fall for low-quality non-Gond dualwheeled devices. The Gondroller is a fantastic device that will make inner city travel a breeze. Pick yours up today; you'll thank Gond you did!</p><p><strong>Aurora's Note</strong>: The delicate machinery of the Gondroller is cleverly devised and requires careful maintenance. Please keep your receipt and take your Gondroller to a Gond temple for repairs, and you can receive repairs for a tithe to the church! Just remember, brand loyalty is brand respect!</p>",
  },
  {
    name: "Multi-Purpose Heavy Cloak",
    price: 4,
    denomination: "sp",
    weight: 1,
    description:
      "<p>You might find yourself out in the wilderness during terrible weather. You might even be caught in unusual weather patterns on the road. When life comes at you, take shelter with our multi-purpose heavy cloak! Our experts have combined a number of fabrication techniques that culminate in a shelter that will protect against the elements in a pinch. This cloak is especially warm and unrolls into the perfect material for a handy bivouac or tent. In warmer weather, the cloak can roll up and be used as bedding. Best of all, it hardly takes up any space!</p>",
  },
  {
    name: "Sun Protection Hat",
    price: 4,
    denomination: "sp",
    weight: 1,
    description:
      "<p>Don't let the sun be one among the myriad of your travel concerns. Our sun protection hat is meant to beat the sun and the heat! Travel boldly into warm environs while you protect your style! Our hats come in several different colors and shapes, but all are designed and guaranteed to keep the sun off your face. It protects you on your hikes, long distance travel, and beach expeditions. Take it everywhere you go!</p><p><strong>Aurora's Note</strong>: Our sun protection hat can prevent sunstroke and sunburn, but only when worn properly, and with a proper long-sleeved shirt. Our guarantee will not cover improper wearing, damaged hats, or exposure to spells that replicate sunlight.</p>",
  },
  {
    name: "Wind Coat",
    price: 4,
    denomination: "sp",
    weight: 1,
    description:
      "<p>Spring and wind go together like darkness and danger! Take a wind coat so that you aren't caught off guard. This light but cozy coat will protect you from winds and chills in most temperate spring weather, and the convenient buttons mean you can open the front for instant comfort! We sell a number of designs and fashions, and we are adding more each day! Please consider visiting one of our locations for a fitting.</p><p><strong>Aurora's Note</strong>: We are proud to announce that we will soon be holding an inaugural design contest for those of you who fancy yourselves as clothing designers. Maybe some fancy traveler or adventurer will wear your fashions someday!</p>",
  },
];
const folderName = "Aurora's Whole Realms Spring Catalogue";
const source = "Aurora's Whole Realms Spring Catalogue";
let folder = game.folders.contents.find(
  (folder) => folder.type === "Item" && folder.name === folderName
);

if (folder == undefined) {
  folder = await Folder.create(
    {
      name: folderName,
      type: "Item",
    },
    { displaySheet: false }
  );
}

for (const itemData of itemsData) {
  let item = game.items.getName(itemData.name);
  if (item != undefined) continue;

  item = await Item.create(
    {
      name: itemData.name,
      type: "loot",
      folder: folder,
      system: { 
        price: { value: itemData.price, denomination: itemData.denomination },
        weight: itemData.weight,
        description: { value: itemData.description },
        source: source,
      },
      permission: {
        default: CONST.DOCUMENT_PERMISSION_LEVELS.LIMITED,
      },
    },
    {
      displaySheet: false,
    }
  );
}
