document.addEventListener('DOMContentLoaded', () => {
    const promptContainer = document.getElementById('prompt-container');
    const searchBar = document.getElementById('search-bar');
    const businessUnitFilter = document.getElementById('business-unit-filter');
    const roleFilter = document.getElementById('role-filter');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-prompt-content');
    const modalClose = document.getElementById('modal-close');

    let prompts = [];

    // Fetch and process the prompt data
    fetch('prompts.json')
        .then(response => response.json())
        .then(data => {
            prompts = data;
            populateFilters(prompts);
            displayPrompts(prompts);
        });

    // Populate filter dropdowns with unique values
    function populateFilters(prompts) {
        const businessUnits = [...new Set(prompts.map(p => p.business_unit))];
        const roles = [...new Set(prompts.flatMap(p => p.role.split(';').map(r => r.trim())))];

        businessUnits.sort().forEach(unit => {
            const option = document.createElement('option');
            option.value = unit;
            option.textContent = unit;
            businessUnitFilter.appendChild(option);
        });

        roles.sort().forEach(role => {
            const option = document.createElement('option');
            option.value = role;
            option.textContent = role;
            roleFilter.appendChild(option);
        });
    }

    // Display prompts in the container
    function displayPrompts(promptsToDisplay) {
        promptContainer.innerHTML = '';
        promptsToDisplay.forEach((prompt, index) => {
            const card = document.createElement('div');
            card.className = 'prompt-card';
            card.dataset.promptId = index; // Use index as a simple ID

            const title = document.createElement('h2');
            title.textContent = prompt.title;
            card.appendChild(title);

            const role = document.createElement('div');
            role.className = 'role';
            role.textContent = prompt.role;
            card.appendChild(role);

            const description = document.createElement('p');
            description.className = 'description';
            description.textContent = prompt.description;
            card.appendChild(description);

            promptContainer.appendChild(card);
        });
    }

    // Filter prompts based on search and dropdown selections
    function filterPrompts() {
        const searchTerm = searchBar.value.toLowerCase();
        const selectedUnit = businessUnitFilter.value;
        const selectedRole = roleFilter.value;

        const filteredPrompts = prompts.filter(prompt => {
            const matchesSearch = (
                prompt.title.toLowerCase().includes(searchTerm) ||
                prompt.description.toLowerCase().includes(searchTerm) ||
                prompt.role.toLowerCase().includes(searchTerm)
            );
            const matchesUnit = !selectedUnit || prompt.business_unit === selectedUnit;
            const matchesRole = !selectedRole || prompt.role.split(';').map(r => r.trim()).includes(selectedRole);

            return matchesSearch && matchesUnit && matchesRole;
        });

        displayPrompts(filteredPrompts);
    }

    // Event listeners for filtering
    searchBar.addEventListener('input', filterPrompts);
    businessUnitFilter.addEventListener('change', filterPrompts);
    roleFilter.addEventListener('change', filterPrompts);

    // Event listener for opening the modal
    promptContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.prompt-card');
        if (card) {
            const promptId = parseInt(card.dataset.promptId, 10);
            const prompt = prompts[promptId];
            openModal(prompt);
        }
    });

    function openModal(prompt) {
        // Clear previous content
        modalContent.innerHTML = '';

        // Create elements programmatically to avoid HTML parsing issues
        const pre = document.createElement('pre');
        pre.textContent = prompt.prompt;

        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = 'Copy Prompt';

        copyBtn.addEventListener('click', (e) => {
            navigator.clipboard.writeText(pre.textContent).then(() => {
                e.target.textContent = 'Copied!';
                setTimeout(() => {
                    e.target.textContent = 'Copy Prompt';
                }, 2000);
            });
        });

        modalContent.appendChild(pre);
        modalContent.appendChild(copyBtn);
        modalOverlay.classList.add('visible');
    }

    function closeModal() {
        modalOverlay.classList.remove('visible');
    }

    // Event listeners for closing the modal
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
});
