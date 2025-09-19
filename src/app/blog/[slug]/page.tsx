
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/data/blog-data';
import { Calendar, User, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Article non trouvé',
    };
  }

  return {
    title: `${post.title} | FLEXFOND Blog`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.publicationDate,
      authors: [post.author],
      images: [
        {
          url: `https://picsum.photos/seed/${post.slug}/1200/630`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <div className="relative w-full h-[40vh] md:h-[50vh]">
        <Image
          src={`https://picsum.photos/seed/${post.slug}/1200/600`}
          alt={post.title}
          fill
          priority
          className="object-cover"
          data-ai-hint={post.imageHint}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold text-white uppercase">{post.title}</h1>
            <div className="mt-4 flex justify-center items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.publicationDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Par {post.author}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-16 md:py-24">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 prose prose-lg max-w-none text-foreground leading-loose" dangerouslySetInnerHTML={{ __html: post.content }} />
          
          <aside className="lg:col-span-1 space-y-8 sticky top-24 self-start">
            <Card className="bg-secondary/50">
              <CardHeader>
                <CardTitle className="uppercase">Un Projet en Tête ?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Nos experts sont là pour vous aider à concrétiser vos ambitions.
                </p>
                <Button asChild size="lg" className="w-full">
                  <Link href="/demande-pret">Demander un Prêt</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full">
                  <Link href="/contact">Nous Contacter</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      <div className="bg-secondary/50 py-16 md:py-24">
        <div className="container">
          <h2 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3">
             <MessageSquare />
            <span>Ce que pensent nos lecteurs</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {post.comments.map((comment, index) => (
              <Card key={index} className="bg-background">
                <CardContent className="p-6">
                  <p className="text-muted-foreground italic">"{comment.text}"</p>
                  <div className="flex items-center mt-4">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <p className="font-semibold text-primary">{comment.author}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
