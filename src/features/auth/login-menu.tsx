import { Mail, VenetianMask } from 'lucide-react';
import { Link } from 'react-router-dom';

export function LoginMenu(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-3xl mb-4">Sign Up</h2>
      <ul>
        <li>
          <Link
            className="flex flex-row p-3 border rounded-md items-center hover:cursor-pointer hover:bg-slate-200 mb-2"
            to="/signin/email"
          >
            <Mail />
            <span className="ml-2">Continue with Email</span>
          </Link>
        </li>
        <li className="flex flex-row p-3 border rounded-md items-center hover:cursor-pointer hover:bg-slate-200">
          <VenetianMask />
          <span className="ml-2">Continue as a guest</span>
        </li>
      </ul>
    </div>
  );
}
