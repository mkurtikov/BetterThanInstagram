let imagesData = [
    {
        'url': 'http://res.cloudinary.com/kseniia/image/upload/v1521312923/hirbhonyj1yntdb0outh.png',
        'tooltip': 'This monkey is cool and I\'m not',
        'x': 12,
        'y': 19,
        'width': 29,
        'height': 71
    },
    {
        'url': 'http://res.cloudinary.com/kseniia/image/upload/v1521312860/mrkxaz7hpmrh8ad513r8.png',
        'tooltip': 'Shtany za 40 UAH',
        'x': 36,
        'y': 15,
        'width': 59,
        'height': 31
    },
    {
        'url': 'http://res.cloudinary.com/kseniia/image/upload/v1521557115/sjni7grngkwn4rfxrv9y.jpg',
        'tooltip': '<3',
        'x': 36,
        'y': 15,
        'width': 59,
        'height': 31
    },
    {
        'url': 'http://res.cloudinary.com/kseniia/image/upload/v1521299082/qqnhq8v0l6codht2vhbo.jpg',
        'tooltip': 'Pepe the Frog (/ˈpɛpeɪ/) is a popular Internet meme. A green anthropomorphic frog with a humanoid body, Pepe originated in a comic by Matt Furie called Boy\'s Club.',
        'x': 36,
        'y': 15,
        'width': 59,
        'height': 31
    },
    {
        'url': 'http://res.cloudinary.com/kseniia/image/upload/v1521298625/p98cqp7ha1fid6t4vlvj.jpg',
        'tooltip': 'Toms River, New Jersey',
        'x': 36,
        'y': 15,
        'width': 59,
        'height': 31
    }
];

export function getData () {
    return imagesData;
}

export function addNewData (imgDataArray, onSuccess) {
    imagesData.push(imgDataArray);
    onSuccess();
}

export function editImage (updatedImageData, onSuccess) {

    imagesData.forEach((itemData) => {
        if(itemData.url === updatedImageData.url) {
            const itemDataArray = Object.values(itemData),
                updatedImageDataArray = Object.values(updatedImageData);
            console.log(itemDataArray);
            itemDataArray.forEach((item) => {
                console.log(item);
            });
            for(let k = 0; k < itemDataArray.length; k++) {
                if(itemDataArray[k] !== updatedImageDataArray[k] && updatedImageDataArray[k] !== 'undefined') {
                    itemDataArray[k] = updatedImageDataArray[k];
                }
            }
        }
    });

    onSuccess();
}

export function getImageData(url, onSuccess) {
    const response = imagesData.filter(function(item) {
        return item.url === url;
    });
    onSuccess(response);
}

export function deleteImage(url, onSuccess) {

    imagesData.forEach((itemData, k) => {
        if(itemData.url === url) {
            imagesData.splice(k, 1);
        }
    });

    onSuccess(imagesData);
}

