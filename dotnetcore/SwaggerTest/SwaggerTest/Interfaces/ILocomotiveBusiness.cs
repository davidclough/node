using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SwaggerTest.Interfaces
{
    public interface ILocomotiveBusiness
    {
        IEnumerable<decimal> GetLocomotiveInfo();
    }
}
