import './Testimonials.css';
import SplitText from '../../../content/TextAnimations/SplitText/SplitText';
import FadeContent from '../../../content/Animations/FadeContent/FadeContent';

const Testimonials = () => {
  const tweets = [
    {
      id: 1,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      text: 'React Bits has completely transformed how I build UIs. The animations are smooth and the components are so easy to integrate!',
      handle: '@devjohn',
      url: 'https://twitter.com/devjohn/status/123456789'
    },
    {
      id: 2,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      text: 'Finally found a component library that actually makes my React apps look professional. Love the attention to detail! ✨',
      handle: '@sarahcodes',
      url: 'https://twitter.com/sarahcodes/status/123456790'
    },
    {
      id: 3,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      text: 'The split text animations from React Bits saved me hours of development time. Incredible work by the team!',
      handle: '@mikereacts',
      url: 'https://twitter.com/mikereacts/status/123456791'
    },
    {
      id: 4,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      text: 'Been using React Bits for my client projects and the feedback has been amazing. Clients love the polished animations!',
      handle: '@emilydev',
      url: 'https://twitter.com/emilydev/status/123456792'
    },
    {
      id: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      text: 'React Bits is a game changer for frontend developers. The components are beautifully crafted and performant.',
      handle: '@alexbuilds',
      url: 'https://twitter.com/alexbuilds/status/123456793'
    },
    {
      id: 6,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face',
      text: 'Just shipped a landing page using React Bits components. The result is stunning and it took half the time! 🚀',
      handle: '@designerlisa',
      url: 'https://twitter.com/designerlisa/status/123456794'
    },
    {
      id: 7,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face',
      text: 'The meta balls animation from React Bits is absolutely mesmerizing. Perfect for hero sections!',
      handle: '@creativecode',
      url: 'https://twitter.com/creativecode/status/123456795'
    },
    {
      id: 8,
      avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=40&h=40&fit=crop&crop=face',
      text: 'React Bits components have elevated my portfolio site to the next level. Highly recommend to all developers!',
      handle: '@jennycodes',
      url: 'https://twitter.com/jennycodes/status/123456796'
    },
    {
      id: 9,
      avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=40&h=40&fit=crop&crop=face',
      text: 'The documentation and examples are top-notch. React Bits makes complex animations accessible to everyone.',
      handle: '@tomdev',
      url: 'https://twitter.com/tomdev/status/123456797'
    }
  ];

  // Create three arrays for different rows with different tweets
  const row1Tweets = tweets.slice(0, 3);
  const row2Tweets = tweets.slice(3, 6);
  const row3Tweets = tweets.slice(6, 9);

  const TweetCard = ({ tweet }) => (
    <div 
      className="testimonial-card"
      onClick={() => window.open(tweet.url, '_blank')}
    >
      <div className="testimonial-content">
        <p className="testimonial-text">{tweet.text}</p>
        <div className="testimonial-author">
          <img 
            src={tweet.avatar} 
            alt="Avatar" 
            className="testimonial-avatar"
          />
          <span className="testimonial-handle">{tweet.handle}</span>
        </div>
      </div>
    </div>
  );

  const MarqueeRow = ({ tweets, direction = 'left', speed = 30 }) => {
    // Create enough duplicates to ensure seamless looping
    // We need at least enough content to fill the container width plus extra for smooth transitions
    const duplicatedTweets = [...tweets, ...tweets, ...tweets, ...tweets];

    return (
      <div className="testimonial-row">
        <div 
          className={`testimonial-marquee testimonial-marquee-${direction}`}
          style={{ '--speed': `${speed}s` }}
        >
          {duplicatedTweets.map((tweet, index) => (
            <TweetCard key={`${tweet.id}-${index}`} tweet={tweet} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <SplitText
            rootMargin="0"
            threshold={0}
            text="Loved by developers"
            className="testimonials-title"
            splitType="chars"
            delay={30}
            duration={2}
          />

          <FadeContent blur>
            <p className="testimonials-subtitle">
              See what developers are saying about React Bits
            </p>
          </FadeContent>
        </div>

        <div className="testimonials-marquee-container">
          <MarqueeRow tweets={row1Tweets} direction="left" speed={40} />
          <MarqueeRow tweets={row2Tweets} direction="right" speed={35} />
          <MarqueeRow tweets={row3Tweets} direction="left" speed={45} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
