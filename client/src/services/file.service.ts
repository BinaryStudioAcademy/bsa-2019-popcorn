

export const uploadFile = async (file: FormData) => {
    let response = await fetch('/upload',{
        method: "POST",
        body:file
    });

    response = await response.json();
    return response.data;
};