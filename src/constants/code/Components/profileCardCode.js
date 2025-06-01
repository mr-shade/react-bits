import { generateCliCommands } from '@/utils/utils';

import code from '@content/Components/ProfileCard/ProfileCard.jsx?raw';
import css from '@content/Components/ProfileCard/ProfileCard.css?raw';
import tsCode from "@ts-default/Components/ProfileCard/ProfileCard.tsx?raw";

export const profileCard = {
  ...(generateCliCommands('Components/ProfileCard', ['default', 'ts/default'])),
  usage: `import ProfileCard from './ProfileCard'
  
<ProfileCard
  name="Javi A. Torres"
  title="Software Engineer"
  handle="javicodes"
  status="Online"
  contactText="Contact Me"
  avatarUrl="/path/to/avatar.jpg"
  showUserInfo={true}
  enableTilt={true}
  onContactClick={() => console.log('Contact clicked')}
/>`,
  code,
  css,
  tsCode
}