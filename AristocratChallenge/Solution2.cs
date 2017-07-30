using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristocratChallenge
{
    public class Solution2
    {
        public static void Main()
        {
            int n = int.Parse(Console.ReadLine());

            string[] values = Console.ReadLine().Split(' ');
            int[] arr = new int[values.Length];
            for(int i=0; i< values.Length; i++)
            {
                arr[i] = int.Parse(values[i]);
            }

            int q = int.Parse(Console.ReadLine());
            while(q-- > 0)
            {
                string[] qValues = Console.ReadLine().Split(' ');
                int op = int.Parse(qValues[0]);
                int val1 = int.Parse(qValues[1]);
                int val2 = int.Parse(qValues[2]);

                if(op == 0)
                {
                    int result = OperationLR(arr, val1, val2);
                    Console.WriteLine(result);
                }
                else
                {
                    OperationXY(arr, val1, val2);
                }
            }
        }

        private static void OperationXY(int[] arr, int X, int Y)
        {
            arr[X - 1] = arr[X - 1] ^ Y;
        }

        private static int OperationLR(int[] arr, int L, int R)
        {
            int value = arr[L - 1];

            for(int i=L; i<R; i++)
            {
                value ^= arr[i];
            }

            return value;
        }
    }
}
