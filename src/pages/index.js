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
    <div>
      <h1>Hoy toca:</h1>
      <p>Limpiar Mesa: {router.query.firstResult || 'Loading...'}</p>
      <p>Lavar Trastes: {router.query.secondResult || 'Loading...'}</p>
    </div>
  );
};

export default Home;
