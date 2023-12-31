import Link from "next/link";
import { getGames, getCoverImages } from "../services/games";
import { mdToHTML } from "./snarkdown";
import { Pagination } from "./components/pagination";
export default async function Home({ searchParams }) {
  const { page } = searchParams;
  const { data: games, pagination } = await getGames({ page });
  console.log(games);

  const coverImagesPromises = games.map(({ attributes }) =>
    getCoverImages({ attributes })
  );
  const coverImages = await Promise.all(coverImagesPromises);

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a href='' className="flex items-center">
            <img
              src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngegg.com%2Fen%2Fsearch%3Fq%3DGAME&psig=AOvVaw2I7HODnm_mW4D1TDN9V-3k&ust=1692328667837000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCIi-tNrd4oADFQAAAAAdAAAAABAW'
              className="w-20"
              alt=""
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              games library
            </span>
          </a>
          <div className="flex items-center">
            <a
              href="tel:5541251234"
              className="mr-6 text-sm  text-gray-500 dark:text-white hover:underline"
            >
              (555) 412-1234
            </a>
            <a
              href="#"
              className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
            >
              Login
            </a>
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-900 dark:text-white hover:underline"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Company
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Features
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {games.map(({ attributes, id }, index) => (
          <Link
            key={id}
            href="#"
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src={coverImages[index]}
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {attributes.title}
              </h5>
              <p
                className="mb-3 font-normal text-gray-700 dark:text-gray-400"
                dangerouslySetInnerHTML={{
                  __html: mdToHTML(attributes.descripcion),
                }}
              />
            </div>
          </Link>
        ))}
        <Pagination pagination={pagination} />
      </main>
        <footer className="bg-white rounded-xl shadow m-4 dark:bg-gray-800">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023{" "}
              <Link
                href="www.linkedin.com/in/matias-torres-developer-freelance/"
                className="hover:underline"
              >
                M.T_DESAROLLO-WEB™
              </Link>
              . All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6 ">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </footer>
    </>
  );
}
