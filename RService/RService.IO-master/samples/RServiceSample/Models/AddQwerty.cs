using System;
using System.Collections.Generic;
using System.Linq;
using RService.IO.Abstractions;

namespace RServiceSample.Models
{
    [Route("api/qwerty", RestVerbs.Post)]
    public class AddQwerty
    {
        public string Id { get; set; }
        public int Rating { get; set; }
        public SubQwerty[] SubQwerties { get; set; }
    }

    public class SubQwerty
    {
        public string Id { get; set; }
        public int Quantity { get; set; }
    }
}
