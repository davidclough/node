using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Scaffolder
{
    public static class StringUtilities
    {
        public static string ToCamelCase(this string tokenName)
        {
            return tokenName.Substring(0, 1).ToLower() + tokenName.Substring(1);
        }
    }
}
