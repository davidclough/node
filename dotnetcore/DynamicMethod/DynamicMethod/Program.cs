using System;
using System.Diagnostics;
using System.Reflection.Emit;

namespace DynamicMethod
{
    // https://docs.microsoft.com/en-us/dotnet/framework/reflection-and-codedom/how-to-define-and-execute-dynamic-methods

    class Program
    {
        private delegate TReturn OneParameter<out TReturn, in TParameter0>(TParameter0 p0);

        static void Main(string[] args)
        {
            Type[] methodArgs = { typeof(int) };

            var squareIt = new System.Reflection.Emit.DynamicMethod("SquareIt",
                                                                    typeof(long),
                                                                    methodArgs,
                                                                    typeof(Program).Module);

            ILGenerator il = squareIt.GetILGenerator();
            il.Emit(OpCodes.Ldarg_0);
            il.Emit(OpCodes.Conv_I8);
            il.Emit(OpCodes.Dup);
            il.Emit(OpCodes.Mul);
            il.Emit(OpCodes.Ret);

            var invokeSquareIt = (OneParameter<long, int>)squareIt.CreateDelegate(typeof(OneParameter<long, int>));

            Console.WriteLine("123456789 squared = {0}", invokeSquareIt(123456789));

            if (Debugger.IsAttached)
            {
                Console.ReadKey();
            }
        }
    }
}
