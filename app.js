// app.js - 网站动态内容加载脚本

document.addEventListener('DOMContentLoaded', () => {
    console.log("网站加载完成，开始加载诗词内容...");

    // -----------------------------------------------------
    // 1. 定义 Contentful API 访问信息 (已替换为您提供的凭证)
    const CONTENTFUL_SPACE_ID = 'va0v74jfzjex'; // 您的 Space ID
    const CONTENTFUL_ACCESS_TOKEN = '76jX8wRdouskf3NUlz-I582XD8M55yHMhQCdgI6XG9s YDen5UlRFxSdxvXF-hAfRMesgMd8m3T9LymOg0FxSXg'; // 您的 Access Token
    // -----------------------------------------------------


    async function fetchContent(contentType) {
        // 构造 API 请求的 URL
        const apiUrl = `https://api.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/entries?content_type=${contentType}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`API 请求失败: ${response.statusText}`);
            }

            const data = await response.json();
            renderContent(contentType, data);

        } catch (error) {
            console.error("获取 Contentful 数据时发生错误:", error);
            // 错误发生时，显示一个友好提示
            const container = document.querySelector(`[data-type="${contentType}"]`);
            if (container) {
                container.innerHTML = `<p style="color: red;">加载内容失败，请检查 API 凭证或 Contentful 数据是否正确。</p>`;
            }
        }
    }

    function renderContent(type, data) {
        const container = document.querySelector(`[data-type="${type}"]`);

        if (!container) return; 

        if (type === 'poem') {
            // 渲染诗词内容
            container.innerHTML = `
                <p class="poem-title">${data.title}</p>
                <p class="poem-text">${data.text}</p>
                <span class="author">· ${data.author}</span>
            `;
        }
        // 以后可以继续添加 type === 'story' 的渲染逻辑
    }

    // 启动数据加载
    fetchContent('poem'); // 专门加载诗词数据
    // fetchContent('story'); // 稍后可以取消注释，用于加载故事
});