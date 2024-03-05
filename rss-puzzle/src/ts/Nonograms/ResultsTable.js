export default class ResultsTable {
    constructor() {
        this.results = JSON.parse(localStorage.getItem('results')) || [];
        this.sortResults();
    }

    addResult(result) {
        this.results.push(result);
        this.sortResults();
        this.trimResults();
        this.saveResultsToLocalStorage();
    }

    sortResults() {
        this.results.sort((a, b) => a.time - b.time);
    }

    trimResults() {
        while (this.results.length > 5) {
            this.results.shift();
        }
    }

    saveResultsToLocalStorage() {
        localStorage.setItem('results', JSON.stringify(this.results));
    }

    getResults() {
        return this.results;
    }
}
