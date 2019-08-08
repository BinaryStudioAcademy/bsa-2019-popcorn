

export const uploadFile = (file: FormData) => {
    return fetch('/upload',{
        method: "POST",
        body:file
    })
};