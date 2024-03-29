import { useEffect } from 'react';
import { useRouter } from 'next/router';

const results = ['Gerardo', 'Samuel', 'Camila'];
const saturdayNames = ['Papá', 'Mamá'];

const Home = () => {
  const router = useRouter();

  // Custom function to get the day of the year
  const getDayOfYear = (date) => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  useEffect(() => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay(); // Sunday is 0, Saturday is 6
    const dayOfYear = getDayOfYear(currentDate);

    let firstResult;
    let secondResult;

    if (dayOfWeek === 6) {
      firstResult = saturdayNames[0];
      secondResult = saturdayNames[1];
    } else {
      const firstIndex = dayOfYear * 2 % results.length;
      const secondIndex = (dayOfYear * 2 + 1) % results.length;
      firstResult = results[firstIndex];
      secondResult = results[secondIndex];
    }

    // Push the selected results into the query string
    router.push(`/?firstResult=${firstResult}&secondResult=${secondResult}`, undefined, { shallow: true });
  }, []);

  return (
    <>
      <div className="navbar bg-base-100">
        <a className="btn btn-ghost normal-case text-xl">Que Me Toca Hoy?</a>
      </div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Limpiar Mesa: </h2>
          <p>{router.query.firstResult || 'Loading...'}</p>
        </div>
      </div>
      <br/>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Lavar Trastes:  </h2>
          <p>{router.query.secondResult || 'Loading...'}</p>
        </div>
      </div>
    </>
  );
};

export default Home;
