// I managed to run it manually - from the "product" folder:
docker build .                                                                  (docker build . -t product-service)
docker run -p 5001:80 dockercomposein12minutes_product-service

THIS WAS WITHOUT mounting, so changing the contents of a file within the "product" folder will not filter straight through to the container.
However, cannot run this with a mounted volume.


Go to    [http://localhost:5001/](http://localhost:5001/)

docker ps -a
docker stop <ID>


// Now he is going to use docker-compose.yml file.
docker-compose up

 I ran `docker-compose build` (only 'cos docker instructed me to after an error).
> IMPORTANT(1): I had to copy "api.py" into ".product" MANUALLY and then things worked.

> IMPORTANT(2): I also had to change the name of product-service in the YML file (it's as though docker had cached something):
> 
                services:
                  big-service:
    CONCLUSION: I think the second one might be down to me continually deleting images, even force deleting them.

> IMPORTANT(1): I also had to copy "inde.php" into ".website" MANUALLY and then things worked.
***: The .folder s are the internals docker ones - I am having to copy every change manually though.


The image is called: dockercomposeinminutes_product-service          not sure if that is causing problems.
It is normal: https://stackoverflow.com/questions/33045358/docker-compose-image-named-prefix-s-1-instead-of-s











XXXX
docker run -p 5001:80 product-service -v "product:/usr/src/app"



