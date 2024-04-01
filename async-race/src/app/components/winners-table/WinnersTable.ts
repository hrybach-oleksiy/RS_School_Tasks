// <div class="container-winners">
//         <table class="table-winners">
//           <thead>
//             <tr>
//               <th>Number</th>
//               <th>Car</th>
//               <th>Name</th>
//               <th>Wins</th>
//               <th>Best time (seconds)</th>
//             </tr>
//           </thead>
//           <tbody class="container-win">
//           </tbody>
//         </table>
// </div>

import BaseComponent from '../BaseComponent';

import styles from './WinnerTable.module.scss';

export default class WinnersTable extends BaseComponent {
  constructor() {
    super(
      {
        tag: 'table',
        classNames: [styles['winners-table']],
      },
      new BaseComponent(
        { tag: 'thead' },
        new BaseComponent(
          { tag: 'tr' },
          new BaseComponent({ tag: 'th', text: '#' }),
          new BaseComponent({ tag: 'th', text: 'Car' }),
          new BaseComponent({ tag: 'th', text: 'Name' }),
          new BaseComponent({ tag: 'th', text: 'Wins' }),
          new BaseComponent({ tag: 'th', text: 'Best Time' }),
        ),
      ),
      new BaseComponent({ tag: 'tbody', classNames: ['table-container'] }),
    );
  }
}
