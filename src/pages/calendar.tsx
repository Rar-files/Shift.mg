import type { NextPage } from 'next'
import CalendarComponent from '../components/Calendar';


const CalendarPage: NextPage = () => {

    return (
        <CalendarComponent/>
    );
}

export async function getStaticProps() {
    return {
        props: {
            protected: true,
        },
    }
}

export default CalendarPage
