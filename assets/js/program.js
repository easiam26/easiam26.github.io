(function () {
    'use strict';

    function normalize(value) {
        return value.toLocaleLowerCase().replace(/\s+/g, ' ').trim();
    }

    function updateEmptyState(panel) {
        const empty = panel.querySelector('[data-program-empty]');
        if (!empty) return;
        const visibleItems = panel.querySelectorAll('.searchable-item:not([hidden])').length;
        empty.hidden = visibleItems !== 0;
    }

    document.querySelectorAll('[data-program-tools]').forEach(function (scope) {
        const search = scope.querySelector('[data-program-search]');

        function filterItems() {
            const query = normalize(search ? search.value : '');
            scope.querySelectorAll('.searchable-item').forEach(function (item) {
                item.hidden = query.length > 0 && !normalize(item.textContent).includes(query);
            });
            scope.querySelectorAll('.program-tab-panel').forEach(updateEmptyState);
            if (!scope.querySelector('.program-tab-panel')) updateEmptyState(scope);
        }

        if (search) search.addEventListener('input', filterItems);

        scope.querySelectorAll('[data-details-action]').forEach(function (button) {
            button.addEventListener('click', function () {
                const shouldOpen = button.dataset.detailsAction === 'open';
                scope.querySelectorAll('details.searchable-item:not([hidden])').forEach(function (details) {
                    details.open = shouldOpen;
                });
            });
        });

        scope.querySelectorAll('[data-print-program]').forEach(function (button) {
            button.addEventListener('click', function () { window.print(); });
        });

        const tabButtons = scope.querySelectorAll('[data-program-tab]');
        tabButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                tabButtons.forEach(function (candidate) {
                    const active = candidate === button;
                    candidate.classList.toggle('active', active);
                    candidate.setAttribute('aria-selected', String(active));
                });
                scope.querySelectorAll('.program-tab-panel').forEach(function (panel) {
                    const active = panel.id === button.dataset.programTab;
                    panel.classList.toggle('active', active);
                    panel.hidden = !active;
                });
                filterItems();
            });
        });

        filterItems();
    });
}());
