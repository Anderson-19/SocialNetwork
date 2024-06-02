
export const validateFile = (name) => {
    const validExtensions = ['png', 'jpg', 'jpeg'];

    const type = name.split('.');
    const extension = type.at(-1);

    if (!validExtensions.includes(extension.toLowerCase())) {
        return `Only images, place change to image of types ${ validExtensions }`;
    }
}