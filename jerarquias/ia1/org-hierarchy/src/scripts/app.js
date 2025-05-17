const hierarchyData = [
    {
        code: "CEO",
        name: "Alice Johnson",
        description: "Chief Executive Officer",
        subordinates: [
            {
                code: "CTO",
                name: "Bob Smith",
                description: "Chief Technology Officer",
                subordinates: [
                    {
                        code: "DEV1",
                        name: "Charlie Brown",
                        description: "Senior Developer",
                        subordinates: []
                    },
                    {
                        code: "DEV2",
                        name: "Diana Prince",
                        description: "Junior Developer",
                        subordinates: []
                    }
                ]
            },
            {
                code: "CFO",
                name: "Eve Davis",
                description: "Chief Financial Officer",
                subordinates: [
                    {
                        code: "ACC1",
                        name: "Frank Castle",
                        description: "Accountant",
                        subordinates: []
                    }
                ]
            },
            {
                code: "CMO",
                name: "Grace Lee",
                description: "Chief Marketing Officer",
                subordinates: []
            }
        ]
    }
];

function renderHierarchy(data, container) {
    const ul = document.createElement('ul');
    data.forEach(node => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${node.name}</strong> (${node.code}): ${node.description}`;
        ul.appendChild(li);
        
        if (node.subordinates && node.subordinates.length > 0) {
            renderHierarchy(node.subordinates, li);
        }
    });
    container.appendChild(ul);
}

document.addEventListener('DOMContentLoaded', () => {
    const hierarchyContainer = document.getElementById('hierarchy');
    renderHierarchy(hierarchyData, hierarchyContainer);
});