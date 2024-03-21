import BaseComponent from '../../components/BaseComponent';
import { h1, h2, span } from '../../components/HTMLComponents';

import { Endpoint } from '../../../types/enums';

import styles from './Garage.module.scss';

// div class="container-garage">
//         <h1 class="title">Garage <span class="count-garage"></span></h1>
//         <h3 class="title">Page #<span class="count-page">1</span></h3>

//         <div class="container-car"></div>
// </div>

export default class Garage extends BaseComponent {
    private totalCars: number = 0;

    private pageNumber: number = 1;

    private garageLink: string = `http://127.0.0.1:3000/${Endpoint.GARAGE}`;

    constructor() {
        super({
            tag: 'div',
            classNames: ['garage', 'page'],
        });

        this.getCars(this.pageNumber);
    }

    private setContent() {
        const title = h1([styles.title], 'Garage  ');
        const totalCarsElement = span(['total-cars'], `(${this.totalCars})`);
        title.append(totalCarsElement);

        const pageNumberTitle = h2(['page-number-title'], 'Page ');
        const pageNumberCount = span(['page-number-count'], `#${this.pageNumber}`);
        pageNumberTitle.append(pageNumberCount);

        this.appendChildren([title, pageNumberTitle]);
    }

    private getCars = async (page: number, limit = 7) => {
        try {
            const response = await fetch(`${this.garageLink}?_page=${page}&_limit=${limit}`, { method: 'GET' });
            this.totalCars = Number(response.headers.get('X-Total-count'));
            this.setContent();
            return await response.json();
        } catch (error) {
            console.error('Error occurred while fetching the list of cars:', error);
            throw error;
        }
    };
}
