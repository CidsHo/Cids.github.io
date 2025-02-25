// 导航栏

// 获取 DOM 元素
const navToggle = document.getElementById('nav-toggle');
const menuOverlay = document.getElementById('menu-overlay');

// 点击按钮时切换菜单栏的显示状态
navToggle.addEventListener('click', (event) => {
    event.stopPropagation(); // 阻止事件冒泡
    menuOverlay.classList.toggle('active');
});

// 点击菜单栏外部时关闭菜单
document.addEventListener('click', (event) => {
    if (!menuOverlay.contains(event.target) && !navToggle.contains(event.target)) {
        menuOverlay.classList.remove('active');
    }
});

// 图片和文字数据
const images = [
    {
        src: 'assets/screen-images/jianghezhishou.jpg',
        captionLine1: '江河守護 River Guardian',
        captionLine2: '武漢, 湖北, 中國. ',
        captionLine3: 'Wuhan, Hubei, China'
    },
    {
        src: 'assets/screen-images/void.jpg',
        captionLine1: '空中 VOID',
        captionLine2: '上海, 中國.',
        captionLine3: 'Shanghai, China.'
    },
    {
        src: 'assets/screen-images/danxia.jpg',
        captionLine1: '丹霞 Danxia',
        captionLine2: '張掖, 甘肅, 中國',
        captionLine3: 'Zhangye, Gansu, China'
    },
    {
        src: 'assets/screen-images/sandroad.jpg',
        captionLine1: '沙路 Road to the Sand',
        captionLine2: '阿拉善左旗, 内蒙古自治區, 中國.',
        captionLine3: 'Alxa East Country, Inner Mongolia, China.'
    },
    {
        src: 'assets/screen-images/desk.JPG',
        captionLine1: '書桌一隅 Something on Desk',
        captionLine2: '中國.',
        captionLine3: 'China.'
    },
    {
        src: 'assets/screen-images/sakana.JPG',
        captionLine1: '魚 Sakana',
        captionLine2: '2020-8-17.',
    }
];

// 获取 DOM 元素
const screenMedia = document.querySelector('.screen-media');
const captionLine1 = document.querySelector('.caption-line-1');
const captionLine2 = document.querySelector('.caption-line-2');
const captionLine3 = document.querySelector('.caption-line-3');

// 随机选择一张图片并更新文字介绍
function showRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length); // 随机索引
    const randomImage = images[randomIndex]; // 随机图片数据

    // 更新图片和文字介绍
    screenMedia.src = randomImage.src;
    captionLine1.textContent = randomImage.captionLine1;
    captionLine2.textContent = randomImage.captionLine2;
    captionLine3.textContent = randomImage.captionLine3;
}

// 初始加载一张随机图片
showRandomImage();

// 每隔 10 秒切换一张图片
setInterval(showRandomImage, 10000);

// 点击银幕容器时跳转到 portfolio.html
const screenContainer = document.querySelector('.screen-container');
screenContainer.addEventListener('click', () => {
    window.location.href = 'portfolio.html';
});

// 导航函数
function navigateTo(url) {
    const content = document.getElementById('content');
    content.classList.add('fade-out'); // 添加淡出动画

    setTimeout(() => {
        window.location.href = url; // 跳转到目标页面
    }, 500); // 500ms 是过渡动画的持续时间
}

// 页面加载时添加淡入动画
window.addEventListener('load', () => {
    const content = document.getElementById('content');
    content.classList.add('fade-in');
});

// 排序和筛选

document.addEventListener('DOMContentLoaded', function() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const sortDateAsc = document.getElementById('sort-date-asc');
    const sortDateDesc = document.getElementById('sort-date-desc');
    const filterPhotography = document.getElementById('filter-photography');
    const filterDesign = document.getElementById('filter-design');
    const filterIdeas = document.getElementById('filter-ideas');
    const resetFilter = document.getElementById('reset-filter');

    // 获取所有项目
    const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));

    // 当前筛选状态
    let currentFilter = 'all';

    // 设置当前选中的按钮
    function setActiveButton(button) {
        // 移除所有按钮的 active 类
        document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
        // 为当前选中的按钮添加 active 类
        if (button) button.classList.add('active');
    }

    // 排序函数
    function sortItems(order) {
        // 添加移动动画
        portfolioItems.forEach(item => item.classList.add('move'));

        // 排序逻辑
        portfolioItems.sort((a, b) => {
            const dateA = new Date(a.getAttribute('data-date'));
            const dateB = new Date(b.getAttribute('data-date'));
            return order === 'asc' ? dateA - dateB : dateB - dateA;
        });

        // 清空网格并重新添加排序后的项目
        portfolioGrid.innerHTML = '';
        portfolioItems.forEach(item => {
            if (currentFilter === 'all' || item.getAttribute('data-category') === currentFilter) {
                portfolioGrid.appendChild(item);
            }
        });

        // 移除移动动画
        setTimeout(() => {
            portfolioItems.forEach(item => item.classList.remove('move'));
        }, 500); // 动画持续时间
    }

    // 筛选函数
    function filterItems(category, button) {
        currentFilter = category; // 更新当前筛选状态
        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block'; // 显示项目
            } else {
                item.style.display = 'none'; // 隐藏项目
            }
        });

        // 设置当前选中的按钮
        setActiveButton(button);

        // 重新排序以填补空白
        sortItems('asc'); // 默认按升序排序
    }

    // 重置筛选函数
    function resetFilters() {
        currentFilter = 'all'; // 重置筛选状态
        portfolioItems.forEach(item => item.style.display = 'block'); // 显示所有项目
        setActiveButton(null); // 取消所有按钮的高亮状态
        sortItems('asc'); // 重新排序
    }

    // 绑定事件
    sortDateAsc.addEventListener('click', () => sortItems('asc'));
    sortDateDesc.addEventListener('click', () => sortItems('desc'));
    filterPhotography.addEventListener('click', () => filterItems('photography', filterPhotography));
    filterDesign.addEventListener('click', () => filterItems('design', filterDesign));
    filterIdeas.addEventListener('click', () => filterItems('ideas', filterIdeas));
    resetFilter.addEventListener('click', resetFilters);
});

// 动态添加高亮效果

function setActiveButton(button) {
    document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
    if (button) button.classList.add('active');
}

filterPhotography.addEventListener('click', () => {
    filterItems('photography');
    setActiveButton(filterPhotography);
});

filterDesign.addEventListener('click', () => {
    filterItems('design');
    setActiveButton(filterDesign);
});

filterIdeas.addEventListener('click', () => {
    filterItems('ideas');
    setActiveButton(filterIdeas);
});

resetFilter.addEventListener('click', () => {
    resetFilters();
    setActiveButton(null); // 重置时取消高亮
});