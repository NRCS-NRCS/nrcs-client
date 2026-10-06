interface MdastNode {
    type: string;
    value?: string;
    children?: MdastNode[];
}

export interface RemarkTableWrapperOptions {
    wrapperClassName?: string;
}

function transform(node: MdastNode, options: RemarkTableWrapperOptions) {
    if (!node.children) {
        return;
    }

    const children: MdastNode[] = [];

    node.children.forEach((child) => {
        if (child.type === 'table') {
            children.push({
                type: 'html',
                value: `<div class="${options.wrapperClassName ?? ''}">`,
            });
            children.push(child);
            children.push({ type: 'html', value: '</div>' });
            return;
        }

        transform(child, options);
        children.push(child);
    });

    // eslint-disable-next-line no-param-reassign
    node.children = children;
}

export default function remarkTableWrapper(options: RemarkTableWrapperOptions = {}) {
    return function transformer(tree: unknown) {
        transform(tree as MdastNode, options);
    };
}
