export default (emojis, sliceStart, sliceEnd) => {
  let list = "";

  for (const emoji of emojis.slice(sliceStart, sliceEnd)) {
    const emojiStr =
      (emoji.animated
        ? `<a:${emoji.name}:${emoji.id}>`
        : `<:${emoji.name}:${emoji.id}>`) + `\`:${emoji.name}:\``;

    if (list.length > 4096) {
      list = emojiStr + "\n";
    } else {
      list += emojiStr + "\n";
    }
  }

  return list;
};
