export const TETROMINOES = [
    {
        id: '1',
        color: '#f00000',
        img: 'red-block',
        block: [
            [1, 1, 0],
            [0, 1, 1],
        ],
        blocks: {
            0: [
                [1, 1, 0],
                [0, 1, 1],
            ],
            90: [
                [0, 1],
                [1, 1],
                [1, 0],
            ],
            180: [
                [1, 1, 0],
                [0, 1, 1],
            ],
            270: [
                [0, 1],
                [1, 1],
                [1, 0],
            ],
        },
        coordinates: [
            [[0, 3], [0, 4], [0, 5]],
            [[1, 3], [1, 4], [1, 5]],
        ],
        rotate: 0,
    },
    {
        id: '2',
        color: '#a100f0',
        img: 'purple-block',
        block: [
            [2, 2, 2],
            [0, 2, 0],
        ],
        blocks: {
            0: [
                [2, 2, 2],
                [0, 2, 0],
            ],
            90: [
                [0, 2],
                [2, 2],
                [0, 2],
            ],
            180: [
                [0, 2, 0],
                [2, 2, 2],
            ],
            270: [
                [2, 0],
                [2, 2],
                [2, 0],
            ],
        },
        coordinates: [
            [[0, 3], [0, 4], [0, 5]],
            [[1, 3], [1, 4], [1, 5]],
        ],
        rotate: 0,
    },
    {
        id: '3',
        img: 'green-block',
        color: '#00f000',
        block: [
            [0, 3, 3],
            [3, 3, 0],
        ],
        blocks: {
            0: [
                [0, 3, 3],
                [3, 3, 0],
            ],
            90: [
                [3, 0],
                [3, 3],
                [0, 3],
            ],
            180: [
                [0, 3, 3],
                [3, 3, 0],
            ],
            270: [
                [3, 0],
                [3, 3],
                [0, 3],
            ],
        },
        coordinates: [
            [[0, 3], [0, 4], [0, 5]],
            [[1, 3], [1, 4], [1, 5]],
        ],
        rotate: 0,
    },
    {
        id: '4',
        img: 'yellow-block',
        color: '#f0f000',
        block: [
            [4, 4],
            [4, 4],
        ],
        blocks: {
            0: [
                [4, 4],
                [4, 4],
            ],
            90: [
                [4, 4],
                [4, 4],
            ],
            180: [
                [4, 4],
                [4, 4],
            ],
            270: [
                [4, 4],
                [4, 4],
            ],
        },
        coordinates: [
            [[0, 3], [0, 4]],
            [[1, 3], [1, 4]],
        ],
        rotate: 0,
    },
    {
        id: '5',
        img: 'orange-block',
        color: '#f0a100',
        block: [
            [5, 0],
            [5, 0],
            [5, 5],
        ],
        blocks: {
            0: [
                [5, 0],
                [5, 0],
                [5, 5],
            ],
            90: [
                [5, 5, 5],
                [5, 0, 0],
            ],
            180: [
                [5, 5],
                [0, 5],
                [0, 5],
            ],
            270: [
                [0, 0, 5],
                [5, 5, 5],
            ],
        },
        coordinates: [
            [[0, 3], [0, 4]],
            [[1, 3], [1, 4]],
            [[2, 3], [2, 4]],
        ],
        rotate: 0,
    },
    {
        id: '6',
        img: 'blue-block',
        color: '#0000f0',
        block: [
            [0, 6],
            [0, 6],
            [6, 6],
        ],
        blocks: {
            0: [
                [0, 6],
                [0, 6],
                [6, 6],
            ],
            90: [
                [6, 0, 0],
                [6, 6, 6],
            ],
            180: [
                [6, 6],
                [6, 0],
                [6, 0],
            ],
            270: [
                [6, 6, 6],
                [0, 0, 6],
            ],
        },
        coordinates: [
            [[0, 3], [0, 4]],
            [[1, 3], [1, 4]],
            [[2, 3], [2, 4]],
        ],
        rotate: 0,
    },
    {
        id: '7',
        img: 'cyan-block',
        color: '#00f0f0',
        block: [
            [7],
            [7],
            [7],
            [7],
        ],
        blocks: {
            0: [
                [7],
                [7],
                [7],
                [7],
            ],
            90: [
                [7, 7, 7, 7]
            ],
            180: [
                [7],
                [7],
                [7],
                [7],
            ],
            270: [
                [7, 7, 7, 7]
            ],
        },
        coordinates: [
            [[0, 3]],
            [[1, 3]],
            [[2, 3]],
            [[3, 3]],
        ],
        rotate: 0,
    },
];

export const SCORE_ITEMS = {
    '0': 0,
    '1': 100,
    '2': 300,
    '3': 700,
    '4': 1500,
}

export const BUTTON_STATES = {
    start: {
        text: 'Начать игру',
        icon: 'start-btn.svg',
    },
    pause: {
        text: 'Остановить игру',
        icon: 'pause-btn.svg',
    }, 
    continue: {
        text: 'Продолжить игру',
        icon: 'continue-btn.svg',
    },
    newGame: {
        text: 'Новая игра',
        icon: 'newGame-btn.svg',
    }
}