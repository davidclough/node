## .NET Core Form the Command Line

Created when following [ASP.NET Core Fundamentals](https://app.pluralsight.com/library/courses/aspdotnet-core-fundamentals/table-of-contents) PluralSight course.

Ordinary command window will do.

	dotnet
	dotnet --version
	dotnet -h
	dotnet new
	dotnet new web
	dotnet run
	
	code .
	dotnet restore		// C:\Users\davidclough\.nuget\packages
	dotnet build

Install C# plugin.

Install recommended stuff and will see a `.vscode` folder appear in project with a couple of files.

Can set a breakpoint and start debugging but if Kestrel server is already running it cannot start another.

`Microsoft.AspNetCore.All` in the csproj file refers to a "meta package" which means it refers to a grouping of many package.

An ASP.NET Core application is just an ordinary application, like a console application.

In `Program.cs` the `CreateDefaulteBuilder` makes an `IConfiguration` service available throughout the application.

After adding a "Greeting" to my newly-added `appsettings.json` try running and see how the high priority of the command line argument overrides the file setting:

	dotnet run "Greeting"="Hello!!!!!!!!"


### Registering Implementations of Interfaces
IGreeter default was registered in `ConfigureServices`. Certain services are automatically registered which is why you can add them a parameters to the `Configure()` method.