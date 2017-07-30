using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristocratChallenge
{
    public class Program
    {
        static public void Main()
        {
            String line;
            line = Console.ReadLine();
            int T = Convert.ToInt32(line);

            for (int t_i = 0; t_i < T; t_i++)
            {
                string[] vals = Console.ReadLine().Split(' ');

                long n = Convert.ToInt64(vals[0]);
                long a = Convert.ToInt64(vals[1]);
                long b = Convert.ToInt64(vals[2]);
                long c = Convert.ToInt64(vals[3]);

                long out_ = divisibilty(a, c, b, n);
                Console.WriteLine(out_);
            }
        }

        static long divisibilty(long a, long c, long b, long n)
        {
            long count_a = n / a;
            long count_b = n / b;
            long count_c = n / c;

            long count_ab = n / (a * b / Gcd(a, b));
            long count_bc = n / (b * c / Gcd(b, c));
            long count_ca = n / (c * a / Gcd(c, a));

            long lcm_bc = b * c / Gcd(b, c);
            long lcm_abc = a * lcm_bc / Gcd(a, lcm_bc);
            long count_abc = n / lcm_abc;

            return count_a + count_b + count_c - (count_ab + count_bc + count_ca) + count_abc;
        }

        static long Gcd(long a, long b)
        {
            if (b == 0)
                return a;

            return Gcd(b, a % b);
        }

    }
}
