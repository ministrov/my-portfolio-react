function spliteStringRegExp(string) {
    const characters = [];
    const regex = /[\s\S]/gu;

    let match;

    while ((match = regex.exec(string)) !== null) {
        console.log(match);
        characters.push(match[0]);
    }

    return characters;
}

export default spliteStringRegExp;