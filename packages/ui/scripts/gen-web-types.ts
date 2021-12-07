const genWebTypes = () => {
    return {
        $schema: 'https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json',
        framework: 'vue',
        name: "@pui-vue/ui",
        version: "1.0.0",
        contributions: {
            html: {
                tags: [],
                attributes: [],
                'types-syntax': 'typescript',
            },
        }
    }
}
