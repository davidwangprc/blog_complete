import { convertToRaw } from 'draft-js';

export const draftToMarkdown = (contentState) => {
    const raw = convertToRaw(contentState);
    let markdown = '';

    raw.blocks.forEach((block) => {
        // 处理块级样式
        switch (block.type) {
            case 'header-one':
                markdown += `# ${block.text}\n\n`;
                break;
            case 'header-two':
                markdown += `## ${block.text}\n\n`;
                break;
            case 'unordered-list-item':
                markdown += `- ${block.text}\n`;
                break;
            case 'ordered-list-item':
                markdown += `1. ${block.text}\n`;
                break;
            case 'blockquote':
                markdown += `> ${block.text}\n\n`;
                break;
            default:
                // 处理内联样式
                let text = block.text;
                let inlineStyles = [];
                
                if (block.inlineStyleRanges) {
                    block.inlineStyleRanges.forEach(style => {
                        switch (style.style) {
                            case 'BOLD':
                                inlineStyles.push({
                                    start: style.offset,
                                    end: style.offset + style.length,
                                    markup: '**'
                                });
                                break;
                            case 'ITALIC':
                                inlineStyles.push({
                                    start: style.offset,
                                    end: style.offset + style.length,
                                    markup: '_'
                                });
                                break;
                            case 'CODE':
                                inlineStyles.push({
                                    start: style.offset,
                                    end: style.offset + style.length,
                                    markup: '`'
                                });
                                break;
                        }
                    });

                    // 从后向前应用样式,避免位置偏移
                    inlineStyles.sort((a, b) => b.start - a.start);
                    inlineStyles.forEach(style => {
                        text = text.slice(0, style.start) + 
                               style.markup + 
                               text.slice(style.start, style.end) + 
                               style.markup + 
                               text.slice(style.end);
                    });
                }
                
                markdown += text + '\n\n';
        }
    });

    return markdown;
}; 