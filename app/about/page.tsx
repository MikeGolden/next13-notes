import { Metadata } from "next";

export const dynamic = 'force-static'; // not necessary, just for demonstration

export const metadata: Metadata = {
  title: 'About Us',
  description: 'About NextSpace',
};

export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>We are social media company that is just built to be built.</p>
    </div>
  );
}