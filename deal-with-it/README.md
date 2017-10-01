Code downloaded from [https://github.com/hxlnt/aifunclub](https://github.com/hxlnt/aifunclub).

[Sample using an image URL I selected](http://aifunclub.azurewebsites.net/index.html?link=http://lastingleaders.com/wp-content/uploads/2013/07/People.jpg):

![Sample](http://aifunclub.azurewebsites.net/index.html?link=http://lastingleaders.com/wp-content/uploads/2013/07/People.jpg)

Also see [Fun and Games With NodeJS](https://www.youtube.com/watch?v=B2TkjKY0i3I).

Only small changes have been made to it, e.g. the API key.
Registered with [Azure](https://azure.microsoft.com/en-gb/try/cognitive-services/my-apis/) to get 30 day (1-10-2017) API key for *Face API* via [Try Cognitive Services](https://azure.microsoft.com/en-gb/try/cognitive-services/).

<hr />
Detect, identify, analyse, organise and tag faces in photos

30,000 transactions, 20 per minute.
Endpoint: https://westcentralus.api.cognitive.microsoft.com/face/v1.0

Key 1: 02e8ab76ff0341149ee9c896fd539a1e

Key 2: 5bcf228d32af4f6e92e9231298ba7712

<hr />
Obviously, the keys should not generally be stored in a publicly available place. However, in this case they are only temporary.

In Windows, run:

set PORT=3005
set myoxfordkey = '02e8ab76ff0341149ee9c896fd539a1e'
npm start



