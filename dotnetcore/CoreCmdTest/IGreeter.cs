using Microsoft.Extensions.Configuration;

namespace CoreCmdTest
{
  public interface IGreeter
  {
    string GetMessageOfTheDay();
  }
  public class Greeter : IGreeter
  {
    private IConfiguration _configuration;

    public Greeter(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    public string GetMessageOfTheDay()
    {
      var greeting = _configuration["Greeting"];
      return greeting;
    }
  }
}
