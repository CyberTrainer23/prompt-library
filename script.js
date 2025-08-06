document.addEventListener('DOMContentLoaded', () => {
    const promptContainer = document.getElementById('prompt-container');
    const searchBar = document.getElementById('search-bar');
    const businessUnitFilter = document.getElementById('business-unit-filter');
    const roleFilter = document.getElementById('role-filter');

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
        promptsToDisplay.forEach(prompt => {
            const card = document.createElement('div');
            card.className = 'prompt-card';

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

            const fullPrompt = document.createElement('div');
            fullPrompt.className = 'prompt-full';

            const pre = document.createElement('pre');
            pre.textContent = prompt.prompt;
            fullPrompt.appendChild(pre);

            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.textContent = 'Copy Prompt';
            fullPrompt.appendChild(copyBtn);

            card.appendChild(fullPrompt);
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

    // Event listener for expanding/collapsing prompts and copying
    promptContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.prompt-card');
        if (!card) return;

        if (e.target.classList.contains('copy-btn')) {
            const promptText = card.querySelector('pre').textContent;
            navigator.clipboard.writeText(promptText).then(() => {
                e.target.textContent = 'Copied!';
                setTimeout(() => {
                    e.target.textContent = 'Copy Prompt';
                }, 2000);
            });
        } else {
            const fullPrompt = card.querySelector('.prompt-full');
            fullPrompt.style.display = fullPrompt.style.display === 'block' ? 'none' : 'block';
        }
    });

    // No longer need escapeHtml
});
