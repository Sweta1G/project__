// data.js
export const products = [
	{
		id: 1,
		image_url:
			"https://i.etsystatic.com/33410808/r/il/862404/4151878149/il_794xN.4151878149_rofh.jpg",
		category: "streetwear",
		type: "hoodie",
		name: "Boho Jacket",
		description: "Authentic Boho band hoodie with distressed finish",
		tags: ["Free Spirit", "Boho", "Vintage"],
		traits: ["2 traits"],
		quickAdd: true,
		price: 4599,
		rating: 4.6,
		reviews: 240,
		isTrending: true, // New property to indicate trending products
	},
	{
		id: 2,
		image_url:
			"https://www.topofstyle.com/blog/wp-content/uploads/2017/07/knit-crop-top-1.jpg",
		category: "chic",
		type: "crop top",
		name: "Minimalist Top",
		description: "Clean-cut blazer with contemporary tailoring",
		tags: ["Essential Wear", "Minimalist", "Luxury"],
		traits: ["2 traits"],
		quickAdd: false,
		price: 6799,
		rating: 4.8,
		reviews: 180,
	},
	{
		id: 3,
		image_url:
			"https://i.pinimg.com/originals/95/2d/0e/952d0e48c452ccc99eab2831ea1814dd.jpg",
		category: "retro",
		type: "denim jacket",
		name: "DENIM X",
		description: "Statement sneakers with platform sole and bold design",
		tags: ["Sole Revolution", "Street", "Futuristic"],
		traits: ["2 traits"],
		quickAdd: false,
		price: 5499,
		rating: 4.4,
		reviews: 310,
		isTrending: true,
	},
	{
		id: 4,
		image_url:
			"https://cdn.shopify.com/s/files/1/1299/0309/products/freepeoplejenspiratemysticalmaxi_1024x1024.jpg?v=1484504031",
		category: "boho",
		type: "maxi dress",
		name: "Vintage Maxi",
		description: "Flowing maxi dress with ethnic prints and tassels",
		tags: ["Vinyl Records", "Vintage", "Street"],
		traits: ["2 traits"],
		quickAdd: false,
		price: 1299,
		rating: 4.2,
		reviews: 150,
	},
	{
		id: 5,
		image_url:
			"https://cdna.lystit.com/photos/28a9-2015/12/10/selected-homme-grey-wool-herringbone-blazer-in-slim-fit-gray-product-3-958968280-normal.jpeg",
		category: "formal",
		type: "blazer",
		price: 3499,
		rating: 4.7,
		reviews: 200,
	},
	{
		id: 6,
		image_url:
			"https://1.bp.blogspot.com/-9zb3V51v2_w/VWbFuTV8_gI/AAAAAAAAAbo/nk1WP5lBtkc/s1600/HYJEN-2079_original.jpg",
		category: "ethnic",
		type: "saree",
		price: 2999,
		rating: 4.4,
		reviews: 120,
		isTrending: true,
	},
	{
		id: 7,
		image_url:
			"https://img.joomcdn.net/9ce338c15be0bbf2fb6647119008a0abafe6e933_original.jpeg",
		category: "casual",
		type: "t-shirt",
		price: 599,
		rating: 4.1,
		reviews: 90,
		isTrending: true,
	},
	{
		id: 8,
		image_url:
			"https://cdn.shopify.com/s/files/1/0735/3679/9005/files/3-08-2022-16-22-28-683x1024-1_2023-01.jpg",
		category: "athleisure",
		type: "tracksuit",
		price: 2199,
		rating: 4.5,
		reviews: 160,
	},
	{
		id: 9,
		image_url:
			"https://besteidcollection.com/wp-content/uploads/2021/06/Stylish-Gown-Design-Party-Wear-Evening.jpg",
		category: "party",
		type: "gown",
		price: 2899,
		rating: 4.6,
		reviews: 175,
	},
	{
		id: 10,
		image_url:
			"https://5.imimg.com/data5/VR/MG/MY-26760139/mens-formal-shirt-500x500.jpg",
		category: "formal",
		type: "shirt",
		price: 1299,
		rating: 4.2,
		reviews: 140,
	},

	// Streetwear
	{
		id: 11,
		image_url:
			"https://i.pinimg.com/originals/c7/2b/f3/c72bf3ed2c0db25f1a44e4549f1783da.jpg",
		category: "streetwear",
		type: "sweater",
		price: 1499,
		rating: 4.3,
		reviews: 110,
		isTrending: true,
	},
	{
		id: 12,
		image_url:
			"https://images-na.ssl-images-amazon.com/images/I/71MlkUkRE1L._AC_UL1479_.jpg",
		category: "streetwear",
		type: "jacket",
		price: 2699,
		rating: 4.5,
		reviews: 220,
	},
	{
		id: 13,
		image_url:
			"https://i.pinimg.com/originals/70/a1/b7/70a1b700a14a89b1078864308509c903.jpg",
		category: "streetwear",
		type: "puffer jacket",
		price: 3299,
		rating: 4.7,
		reviews: 180,
		isTrending: true,
	},
	{
		id: 14,
		image_url:
			"https://i.pinimg.com/originals/0f/d6/24/0fd624e6f772671282a3fcd3674bd20b.jpg",
		category: "streetwear",
		type: "oversized t-shirt",
		price: 799,
		rating: 4.1,
		reviews: 75,
	},

	// Chic
	{
		id: 15,
		image_url:
			"https://www.joebrowns.co.uk/media/catalog/product/W/S/WS302A_1.jpg?quality=70&bg-color=255,255,255&fit=bounds&height=&width=",
		category: "chic",
		type: "skirt",
		price: 999,
		rating: 4.2,
		reviews: 130,
		isTrending: true,
	},
	{
		id: 16,
		image_url:
			"https://www.prettydesigns.com/wp-content/uploads/2015/07/V-necline-Jumpsuit.jpg",
		category: "chic",
		type: "jumpsuit",
		price: 1899,
		rating: 4.4,
		reviews: 95,
		isTrending: true,
	},
	{
		id: 17,
		image_url:
			"https://www-s.mlo.me/upen/v/2023/202304/20230416/202304161103415331593.jpg",
		category: "chic",
		type: "heels",
		price: 1499,
		rating: 4.6,
		reviews: 210,
	},
	{
		id: 18,
		image_url:
			"https://i.pinimg.com/736x/84/03/68/840368534118f7b9ed13892c52e163ef.jpg",
		category: "chic",
		type: "crop jacket",
		price: 1799,
		rating: 4.3,
		reviews: 125,
		isTrending: true,
	},

	// Retro
	{
		id: 19,
		image_url:
			"https://dustworn.com/cdn/shop/files/1_6a5af301-e0a1-41b6-80b7-84961979e32c.png?v=1740728576&width=600",
		category: "retro",
		type: "denim shirt",
		price: 1299,
		rating: 4.2,
		reviews: 115,
	},
	{
		id: 20,
		image_url:
			"https://prod-cdn-01.storenvy.com/product_photos/100569109/file_c804f68145_original.jpeg",
		category: "retro",
		type: "retro dress",
		price: 1599,
		rating: 4.4,
		reviews: 140,
	},
	{
		id: 21,
		image_url:
			"https://down-my.img.susercontent.com/file/my-11134207-7r98q-lq79jxbuvavpc7",
		category: "retro",
		type: "cargo pants",
		price: 1399,
		rating: 4.3,
		reviews: 105,
		isTrending: true,
	},
	{
		id: 22,
		image_url:
			"https://i5.walmartimages.com/seo/LAJPXKHY-Jean-Shorts-Womens-High-Waisted-Stretchy-Casual-Summer-Loose-Wide-Leg-Vintage-Demin-Shorts_3113e8ba-7159-4624-8032-527e284e12e6.b38a263e1a1e92f3f20f58e0f93fb233.jpeg",
		category: "retro",
		type: "denim shorts",
		price: 899,
		rating: 4.1,
		reviews: 85,
	},

	// Boho
	{
		id: 23,
		image_url:
			"https://i.pinimg.com/originals/59/30/5e/59305ea40bc1cb485d0ee4914eaa264c.jpg",
		category: "boho",
		type: "boho skirt",
		price: 1199,
		rating: 4.3,
		reviews: 100,
		isTrending: true,
	},
	{
		id: 24,
		image_url:
			"https://i.pinimg.com/originals/93/96/9a/93969a66536249cdbd77694a7a699d1b.jpg",
		category: "boho",
		type: "boho top",
		price: 999,
		rating: 4.2,
		reviews: 90,
	},
	{
		id: 25,
		image_url:
			"https://roselinlin.com/image_cache/resize/670x890/image/catalog/product/2020-04-24/7-1587697848947.jpeg",
		category: "boho",
		type: "beachwear",
		price: 1699,
		rating: 4.4,
		reviews: 110,
	},
	{
		id: 26,
		image_url:
			"https://i.pinimg.com/originals/00/58/d9/0058d9ee8c477b5f003b809d4ff6bb20.png",
		category: "boho",
		type: "boho dress",
		price: 1799,
		rating: 4.5,
		reviews: 125,
	},

	// Formal
	{
		id: 27,
		image_url:
			"https://lsmensclothing.com/wp-content/uploads/2018/06/how-to-buy-a-tuxedo.jpeg",
		category: "formal",
		type: "tuxedo",
		price: 4599,
		rating: 4.7,
		reviews: 190,
		isTrending: true,
	},
	{
		id: 28,
		image_url:
			"https://i.etsystatic.com/5609612/r/il/d5e1ed/1311985543/il_794xN.1311985543_rdhj.jpg",
		category: "formal",
		type: "long coat",
		price: 3899,
		rating: 4.6,
		reviews: 170,
	},
	{
		id: 29,
		image_url:
			"https://cdn.shopify.com/s/files/1/0162/2116/files/30855370_582731405427305_2095064993786494976_n.jpg?v=1550739463",
		category: "formal",
		type: "chinos",
		price: 1699,
		rating: 4.3,
		reviews: 120,
	},
	{
		id: 30,
		image_url:
			"https://ae01.alicdn.com/kf/HTB1sATLcaagSKJjy0Fcq6AZeVXai/2018-New-Blazer-suit-Mens-Grey-3-Piece-Wedding-Suits-Best-Man-Groomman-Formal-Tuexdos-Custom.jpg",
		category: "formal",
		type: "suit",
		price: 4999,
		rating: 4.8,
		reviews: 250,
	},

	// Ethnic
	{
		id: 31,
		image_url:
			"https://i.pinimg.com/originals/90/68/2c/90682cb28de97e8822976b454909f254.jpg",
		category: "ethnic",
		type: "lehenga",
		price: 3499,
		rating: 4.6,
		reviews: 210,
	},
	{
		id: 32,
		image_url:
			"https://cdn.shopify.com/s/files/1/0121/8376/5088/products/DSC4630.jpg?v=1580673080",
		category: "ethnic",
		type: "kurta",
		price: 1399,
		rating: 4.2,
		reviews: 150,
		isTrending: true,
	},
	{
		id: 33,
		image_url:
			"https://swiftez.com/wp-content/uploads/2023/09/il_794xN.4790320052_elbu.jpg",
		category: "ethnic",
		type: "sherwani",
		price: 4599,
		rating: 4.7,
		reviews: 190,
	},
	{
		id: 34,
		image_url:
			"https://th.bing.com/th/id/R.0fed935a2f1308acd40dc9ade0f71e2b?rik=V5COqvxl7oM35A&riu=http%3a%2f%2fwww.hatkay.com%2fcdn%2fshop%2fproducts%2fARW-8430_1200x1200.jpg%3fv%3d1627895811&ehk=yQkwlxBjqIeMuHeDpu8SlDBGGp0FSXf4YLNPrg8yA1Q%3d&risl=&pid=ImgRaw&r=0",
		category: "ethnic",
		type: "palazzo",
		price: 1199,
		rating: 4.1,
		reviews: 100,
	},

	// Casual
	{
		id: 35,
		image_url:
			"https://ae01.alicdn.com/kf/HTB15c3kHVXXXXb9XpXXq6xXFXXXx/2015-new-summer-men-collar-polo-shirt-men-clothing-solid-mens-polo-shirts-business-casual-poloshirt.jpg",
		category: "casual",
		type: "polo shirt",
		price: 999,
		rating: 4.2,
		reviews: 130,
		isTrending: true,
	},
	{
		id: 36,
		image_url:
			"https://5.imimg.com/data5/SELLER/Default/2022/8/HQ/CY/YN/158031711/jeans-1000x1000.jpg",
		category: "casual",
		type: "jeans",
		price: 1599,
		rating: 4.5,
		reviews: 200,
	},
	{
		id: 37,
		image_url:
			"https://i.pinimg.com/originals/4b/29/cf/4b29cf6903151ab86ecbad21d6e7f768.png",
		category: "casual",
		type: "sneakers",
		price: 2199,
		rating: 4.6,
		reviews: 250,
	},
	{
		id: 38,
		image_url:
			"https://i5.walmartimages.com/asr/149a0cb5-24e0-45f6-8aab-ed940deedd15_2.d9d2d5c2a20549ee21fa5c405947e29a.jpeg",
		category: "casual",
		type: "tank top",
		price: 799,
		rating: 4.0,
		reviews: 80,
		isTrending: true,
	},

	// Athleisure
	{
		id: 39,
		image_url:
			"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/629682/01/fnd/IND/fmt/png/PUMATECH-Men's-Track-Pants",
		category: "athleisure",
		type: "joggers",
		price: 1499,
		rating: 4.3,
		reviews: 115,
	},
	{
		id: 40,
		image_url:
			"https://th.bing.com/th/id/OPAC.qM7RtrMyu2qYdA474C474?w=194&h=252&o=7&dpr=1.5&pid=1.7&rm=3",
		category: "athleisure",
		type: "sweatpants",
		price: 1399,
		rating: 4.2,
		reviews: 95,
	},
	{
		id: 41,
		image_url:
			"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/631445/01/mod02/fnd/IND/fmt/png/Women's-Iconic-T7-Mid-Rise-Leggings",
		category: "athleisure",
		type: "leggings",
		price: 1299,
		rating: 4.4,
		reviews: 130,
		isTrending: true,
	},
	{
		id: 42,
		image_url:
			"https://www.disturbia.co.uk/cdn/shop/files/SS24LV150FRENERYRACERBACKATHLEISURESPORTSBRA_002.jpg?v=1703769515",
		category: "athleisure",
		type: "sports bra",
		price: 899,
		rating: 4.1,
		reviews: 85,
	},

	// Party
	{
		id: 43,
		image_url:
			"https://th.bing.com/th/id/R.e1126c44e77aac5f61edc1344e59acb7?rik=D8aHgWeC4tbQ7A&riu=http%3a%2f%2fnatalet.com%2fimages5%2f0816%2fshort-dance-dresses-formal%2fshort-dance-dresses-formal-38_8.jpg&ehk=6CZv9goWEMD%2b9FtuFJN%2bNs7VfG7gb5TE4I0TMYITMvc%3d&risl=&pid=ImgRaw&r=0",
		category: "party",
		type: "party dress",
		price: 1999,
		rating: 4.3,
		reviews: 120,
	},
	{
		id: 44,
		image_url:
			"https://bonprix.scene7.com/is/image/OttoUK/553w/sequin-party-top~963405FRSP.jpg",
		category: "party",
		type: "sequin top",
		price: 1399,
		rating: 4.2,
		reviews: 95,
	},
	{
		id: 45,
		image_url:
			"https://natalet.com/images/black-white-cocktail-dresses/black-white-cocktail-dresses-81-19.JPG",
		category: "party",
		type: "cocktail dress",
		price: 2299,
		rating: 4.5,
		reviews: 150,
		isTrending: true,
	},
	{
		id: 46,
		image_url:
			"https://i.pinimg.com/736x/dd/52/df/dd52dfa0751829ac502de68aed451207--bridesmaid-sandals-bridal-footwear.jpg",
		category: "party",
		type: "party shoes",
		price: 1599,
		rating: 4.4,
		reviews: 130,
	},

	// Minimal
	{
		id: 47,
		image_url:
			"https://i.pinimg.com/736x/86/d8/71/86d871a0d38abe82404758a5112b1f3f.jpg",
		category: "minimal",
		type: "plain shirt",
		price: 899,
		rating: 4.0,
		reviews: 75,
	},
	{
		id: 48,
		image_url: "https://www.refinery29.com/images/9536666.png",
		category: "minimal",
		type: "simple dress",
		price: 1499,
		rating: 4.3,
		reviews: 100,
		isTrending: true,
	},
	{
		id: 49,
		image_url:
			"https://effortlessgent.com/wp-content/uploads/2020/01/minimal-white-sneakers-Kurt.jpg",
		category: "minimal",
		type: "white sneakers",
		price: 1999,
		rating: 4.6,
		reviews: 180,
	},
	{
		id: 50,
		image_url:
			"https://i.pinimg.com/originals/1c/60/de/1c60de242059aa76cb2b041863b3f3a6.jpg",
		category: "minimal",
		type: "clean blazer",
		price: 2499,
		rating: 4.5,
		reviews: 150,
		isTrending: true,
	},
];
