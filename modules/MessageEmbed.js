/**
 * @typedef {Object} MessageEmbed
 * @property {string} color - Hex color code
 * @property {string} title - Title of the embed
 * @property {string} url - URL
 * @property {string} description - The description of the embed
 * @property {string} author.text - The name of the author
 * @property {string} author.url - The url of the author
 * @property {string} thumbnail.url - URL of the thumbnail
 * @property {number} thumbnail.width - Width of the thumbnail
 * @property {number} thumbnail.height - Height of the thumbnail
 * @property {string} image.url - URL of the image
 * @property {number} image.width - Width of the image
 * @property {number} image.height - Height of the image
 */
 class MessageEmbed {
	/**
	 * @param {MessageEmbed} embed - The embed object
	 */
	constructor(embed) {
		this.uri = "";

		if (!embed) return;
		this.color = embed.color;
		this.title = embed.title;
		this.url = embed.url;
		this.description = embed.description;
		this.author = {
			text: embed.author?.text,
			url: embed.author?.url
		};
		this.thumbnail = {
			url: embed.thumbnail?.url,
			width: embed.thumbnail?.width,
			height: embed.thumbnail?.height
		};
		this.image = {
			url: embed.image?.url,
			width: embed.image?.width,
			height: embed.image?.height
		};

		this.generateURI();
	}
	
	/*
	* Checks and prepares properties to be sent to the API
	*/
	checkProperties() {
		this.color = (_=>{
			switch (typeof this.color) {
				case "string":
					if (this.color.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/gi)) return this.color.length == 4 ? this.color.replace(/([0-9a-fA-F])/gi, "$1$1") : this.color;
					break;
				case "number":
					if (this.color<=16777215 && this.color>=0) return "#"+this.color.toString(16);
					break;
			}
			return "";
		})()

		if (this.thumbnail?.url && this.image?.url) console.warn("[MessageEmbed] You can't set both thumbnail and image, priority will be given to image!");
	}

	/*
	* Generates the URI for the embed
	*/
	generateURI() {
		this.checkProperties();
		
		const uri = [];
		if (this.color) uri.push("color=" + encodeURIComponent(this.color));
		if (this.title) uri.push("bold=" + encodeURIComponent(this.title));
		if (this.url) uri.push("bold_url=" + encodeURIComponent(this.url));
		if (this.description) uri.push("description=" + encodeURIComponent(this.description));
		if (this.author?.text) uri.push("author=" + encodeURIComponent(this.author.text));
		if (this.author?.url) uri.push("author_url=" + encodeURIComponent(this.author.url));
		if (this.image?.url || this.thumbnail?.url) uri.push("thumbnail=" + encodeURIComponent(this.image?.url || this.thumbnail?.url));
		if ((this.image?.url && this.image?.width) || (this.thumbnail?.url && this.thumbnail?.width)) uri.push("thumbnail_width=" + encodeURIComponent(this.image.width || this.thumbnail.width));
		if ((this.image?.url && this.image?.height) || (this.thumbnail?.url && this.thumbnail?.height)) uri.push("thumbnail_height=" + encodeURIComponent(this.image.height || this.thumbnail.height));
		if (this.image?.url) uri.push("thumbnail_big=true");
		this.uri = (!global.DISABLE_EMBED_HIDE ? `||​||`.repeat(200) : "") +"https://api.olejka.ru/v2/discord/embed?" + uri.join("&");
	}

	/**
	 * Sets the color of the embed
	 * @param {string} color - Hex color code
	 * @returns {MessageEmbed}
	 * @memberof MessageEmbed
	 * @example new MessageEmbed().setColor("#FF0000")
	 */
	setColor(color) {
		this.color = color;
		this.generateURI();
		return this;
	}
	/**
	 * Sets the title of the embed
	 * @param {string} title - Title of the embed
	 * @returns {MessageEmbed}
	 * @memberof MessageEmbed
	 * @example new MessageEmbed().setTitle("Title")
	 */
	setTitle(title) {
		this.title = title;
		this.generateURI();
		return this;
	}
	/**
	 * Sets the URL of the embed
	 * @param {string} url - URL
	 * @returns {MessageEmbed}
	 * @memberof MessageEmbed
	 * @example new MessageEmbed().setURL("https://olejka.ru")
	 */
	setURL(url) {
		this.url = url;
		this.generateURI();
		return this;
	}
	/**
	 * Sets the description of the embed
	 * @param {string} description - The description of the embed
	 * @returns {MessageEmbed}
	 * @memberof MessageEmbed
	 * @example new MessageEmbed().setDescription("Description")
	 */
	setDescription(description) {
		this.description = description;
		this.generateURI();
		return this;
	}
	/**
	 * Sets the name of the author of the embed
	 * @param {string} text - The name of the author
	 * @param {string} url - The url of the author
	 * @returns {MessageEmbed}
	 * @memberof MessageEmbed
	 * @example new MessageEmbed().setAuthor("Olejka", "https://olejka.ru")
	 */
	setAuthor(name, url) {
		this.author = {name, url};
		this.generateURI();
		return this;
	}
	/**
	 * Sets the thumbnail of the embed
	 * @param {string} url - URL of the thumbnail
	 * @param {number} width - Width of the thumbnail
	 * @param {number} height - Height of the thumbnail
	 * @returns {MessageEmbed}
	 * @memberof MessageEmbed
	 * @example new MessageEmbed().setThumbnail("https://olejka.ru/s/2c9480c8.png", 1024, 512)
	 */
	setThumbnail(url, width, height) {
		this.thumbnail = { url, width, height};
		this.generateURI();
		return this;
	}

	/**
	 * Sets the image of the embed
	 * @param {string} url - URL of the image
	 * @param {number} width - Width of the image
	 * @param {number} height - Height of the image
	 * @returns {MessageEmbed}
	 * @memberof MessageEmbed
	 * @example new MessageEmbed().setImage("https://olejka.ru/s/2c9480c8.png", 1024, 512)
	 */
	setImage(url, width, height) {
		this.image = { url, width, height};
		this.generateURI();
		return this;
	}
}

module.exports = MessageEmbed;