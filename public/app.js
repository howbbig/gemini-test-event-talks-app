let allTalks = [];

// 页面加载时获取数据
async function init() {
    try {
        const response = await fetch('/api/talks');
        allTalks = await response.json();
        renderTalks(allTalks);
    } catch (err) {
        document.getElementById('scheduleTimeline').innerText = "System Failure: Could not load schedule.";
    }
}

function renderTalks(talkList) {
    const container = document.getElementById('scheduleTimeline');
    container.innerHTML = '';

    if (talkList.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding: 50px;">No talks match your query. Try "AI" or "Security".</div>';
        return;
    }

    talkList.forEach(talk => {
        const card = document.createElement('div');
        card.className = talk.isBreak ? 'talk-card break-card' : 'talk-card';
        
        card.innerHTML = `
            <div class="talk-time">${talk.time}</div>
            <div class="talk-content">
                <h3 class="talk-title">${talk.title}</h3>
                ${talk.speakers ? `<div class="speakers">By ${talk.speakers.join(' & ')}</div>` : ''}
                <p class="description">${talk.description}</p>
                <div class="categories">
                    ${talk.categories ? talk.categories.map(cat => `<span class="tag">${cat}</span>`).join('') : ''}
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// 搜索过滤逻辑
document.getElementById('categorySearch').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = allTalks.filter(talk => {
        // 如果是午休，搜索时默认不显示，除非搜 "lunch"
        if (talk.isBreak) return query === 'lunch';
        
        const inTitle = talk.title.toLowerCase().includes(query);
        const inCats = talk.categories ? talk.categories.some(cat => cat.toLowerCase().includes(query)) : false;
        return inTitle || inCats;
    });
    renderTalks(filtered);
});

init();