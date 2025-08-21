import { Helmet } from 'react-helmet-async';
import BlogHeader from '@/components/BlogHeader';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Daily Blog</title>
        <meta name="description" content="Learn about our founder Yash Shrivastava and our mission to provide daily insightful content." />
        <meta name="keywords" content="about us, founder, mission, daily blog, Yash Shrivastava" />
        <meta property="og:title" content="About Us - Daily Blog" />
        <meta property="og:description" content="Learn about our founder Yash Shrivastava and our mission." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <BlogHeader />
        
        <main className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <header className="text-center mb-16">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">About Daily Word Smith</h1>
                <p className="text-xl text-muted-foreground">
                  Sharing insights, stories, and knowledge one article at a time
                </p>
              </header>

              {/* Founder Section */}
              <section className="mb-16">
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-8 border border-border">
                  <h2 className="text-3xl font-bold mb-6 text-foreground">Meet Our Founder</h2>
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-semibold mb-4 text-foreground">Yash Shrivastava</h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Passionate writer and knowledge enthusiast, Yash founded Daily Word Smith with a simple belief: 
                        that daily writing can transform both the writer and the reader. With a background in technology 
                        and a love for storytelling, Yash brings a unique perspective to each article.
                      </p>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Through years of blogging and content creation, Yash has discovered that the most powerful 
                        insights often come from the intersection of personal experience and universal truths. This 
                        philosophy drives every piece published on Daily Word Smith.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        When not writing, Yash enjoys exploring new technologies, reading philosophy, and connecting 
                        with fellow creators who share a passion for meaningful content.
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-primary to-accent rounded-lg h-64 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <span className="text-3xl font-bold">YS</span>
                        </div>
                        <p className="text-sm opacity-90">Yash Shrivastava</p>
                        <p className="text-xs opacity-75">Founder & Writer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Mission Section */}
              <section className="mb-16">
                <div className="bg-card rounded-xl p-8 border border-border shadow-[var(--blog-shadow)]">
                  <h2 className="text-3xl font-bold mb-6 text-foreground">Our Mission</h2>
                  <div className="space-y-6">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      At Daily Word Smith, we believe that consistent, thoughtful content can make a real difference 
                      in people's lives. Our mission is to provide daily insights that inspire, educate, and empower 
                      our readers to think differently and act purposefully.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-transparent rounded-lg">
                        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full mx-auto mb-4 flex items-center justify-center">
                          <span className="text-xl">💡</span>
                        </div>
                        <h3 className="font-semibold mb-2 text-foreground">Inspire</h3>
                        <p className="text-sm text-muted-foreground">
                          Spark new ideas and perspectives through engaging storytelling and fresh insights.
                        </p>
                      </div>
                      
                      <div className="text-center p-6 bg-gradient-to-br from-accent/10 to-transparent rounded-lg">
                        <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full mx-auto mb-4 flex items-center justify-center">
                          <span className="text-xl">📚</span>
                        </div>
                        <h3 className="font-semibold mb-2 text-foreground">Educate</h3>
                        <p className="text-sm text-muted-foreground">
                          Share knowledge and practical wisdom that readers can apply in their daily lives.
                        </p>
                      </div>
                      
                      <div className="text-center p-6 bg-gradient-to-br from-secondary/20 to-transparent rounded-lg">
                        <div className="w-12 h-12 bg-foreground text-background rounded-full mx-auto mb-4 flex items-center justify-center">
                          <span className="text-xl">🚀</span>
                        </div>
                        <h3 className="font-semibold mb-2 text-foreground">Empower</h3>
                        <p className="text-sm text-muted-foreground">
                          Give readers the tools and motivation to create positive change in their lives.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Values Section */}
              <section>
                <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Our Values</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">Authenticity</h3>
                    <p className="text-muted-foreground">
                      We believe in genuine, honest content that comes from real experience and thoughtful reflection.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">Consistency</h3>
                    <p className="text-muted-foreground">
                      Daily publishing creates rhythm and discipline, both for the writer and the community of readers.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">Growth</h3>
                    <p className="text-muted-foreground">
                      Every article is an opportunity to learn, improve, and share something valuable with others.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">Community</h3>
                    <p className="text-muted-foreground">
                      We're building a space where thoughtful readers can connect and engage with meaningful content.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-12 border-t border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-muted-foreground">
              <p>&copy; 2024 Daily Word Smith. Crafted with care for thoughtful readers.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default About;