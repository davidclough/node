using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SwaggerTest.Classes
{
    public interface IUtility
    {
        string[] GetSomeValues();
    }

    public class Utility : IUtility
    {
        public string[] GetSomeValues()
        {
            return new[] { "Apples", "Oranges", "Lemons" };
        }
    }
}
