# Initial Docker Test

[Learn Docker in 12 Minutes](https://www.youtube.com/watch?v=YFl2mCHdv24)

	docker build -t hello-world .

	docker run -p 5000:80 hello-world

Go to [http://localhost:5000/](http://localhost:5000/)


	(XX docker run -p 5000:80 -v "D:\Visual Studio Projects\GitHub\node\docker\hello-world\src\":"/var/www/html" hello-world)

	docker run -p 5000:80 -v "//D/Visual Studio Projects/GitHub/node/docker/hello-world/src/":"/var/www/html" hello-world


## Other Docker Commands
	docker --help


### Containers

	docker ps
	
	docker stop UID
	
	docker rm UID



### Images

	docker images
	
	docker rmi UID



## Observations
Annoyingly, when trying to run an image it complained of the ports I had previously used being already allocated (**Port is already allocated**). 

There will be a way to free these up as an error in your code results in rather a tedious process involving stopping the container, removing it, building the image

LATER: There must have been a container using the same port that was still in existence.

Actually, deleting another container which was not listed freed up the port...  but need an easier way

 


[https://stackoverflow.com/questions/41318252/running-a-docker-compose-getting-started-example-causes-invalid-volume-specif](https://stackoverflow.com/questions/41318252/running-a-docker-compose-getting-started-example-causes-invalid-volume-specif)

This talks about adding an environment variable to convert Windows style paths.


