# Free Image Hosting

## Overview

This service offers two primary features:
1.  **Image Upload**: Users can easily upload images.
2.  **On-the-fly Image Resizing**: Images can be resized to specific dimensions as needed.

**[HOT]** The service is already deployed and accessible at http://image-hosting-adoo.onrender.com. Feel free to give it a try! <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXE0Z216dWk4MmNvNjRjdjhqeW52bTN0NW16Y3h1OXYzeDBqbTJ5aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/ewh4ipgPw1bBVj4HI5/giphy.gif" width="29px" height="29px">

## How to use

### Image Upload
To upload an image, simply make a call to the following API:
- **URL**: [Domain]/public/images
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Body**:

  |Key|Value type|Description|
  |-|-|-|
  |image|\<binary\>| Your image|


*Request example:*

```bash
curl --location --request POST 'https://image-hosting-adoo.onrender.com/public/images' \
--form 'image=@"/Users/sum.d/Downloads/your-image.jpg"'
```


Response

- **Content-Type**: application/json
- **Body**

    |Key|Value type|Description|
    |-|-|-|
    |url|string|Upload image link|

*Response example:*

```json
{
  "url": "https://image-hosting-adoo.onrender.com/public/images/Cat03_xhwix8.jpg"
}
```

### Image Resizing

Resizing your uploaded image is simple. Just append the desired dimensions to the image URL as query parameters:

  | Parameter name| Required | Value type | Description |
  | - | - | - | - |
  | width | No | number | Desired width of the image |
  | height | No | number | Desired height of the image |

*Request example*:

```bash
curl --location --request GET 'https://image-hosting-adoo.onrender.com/public/images/Cat03_xhwix8.jpg?width=500&height=500'
```

## Show Your Support

Please ⭐️ this repository if this project helped you!
