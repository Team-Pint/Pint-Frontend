export interface Post {
  id: number;
  imageUrl: string;
  title: string;
  location: string;
  description: string;
  device: string;
}

export const DUMMY_POSTS: Post[] = [
  {
    id: 1,
    imageUrl: 'https://picsum.photos/id/10/800/1000',
    title: '여긴 어디 나는 누구',
    location: 'GRAND CENTRAL TERMINAL, NYC',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    device: 'SHOT ON IPHONE X'
  },
  {
    id: 2,
    imageUrl: 'https://picsum.photos/id/28/800/1000',
    title: '해변의 휴식',
    location: 'WAIKIKI, HAWAII',
    description: "It has survived not only five centuries.",
    device: 'SHOT ON IPHONE 13'
  },
  {
    id: 3,
    imageUrl: 'https://picsum.photos/id/43/800/1000',
    title: '오래된 도시',
    location: 'KYOTO, JAPAN',
    description: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
    device: 'SHOT ON SONY A7R'
  }
];