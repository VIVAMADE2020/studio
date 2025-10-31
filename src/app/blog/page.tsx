
import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, User } from "lucide-react";
import { blogPosts } from "@/data/blog-data";

export const metadata: Metadata = {
  title: "Blog | VylsCapital",
  description: "Conseils, actualités et analyses de nos experts pour vous accompagner dans tous vos projets financiers.",
};

export default function BlogPage() {
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime());

  return (
    <div className="bg-background">
      <section className="py-20 md:py-32 text-center bg-secondary/50">
        <div className="container">
          <h1 className="text-4xl md:text-6xl font-bold text-primary uppercase">Notre Blog</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Retrouvez ici tous nos conseils, actualités et analyses de nos experts pour vous accompagner dans vos projets.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map((post) => (
              <Card key={post.slug} className="flex flex-col overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={`https://picsum.photos/seed/${post.slug}/600/400`}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={post.imageHint}
                    />
                  </div>
                </Link>
                <CardHeader>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.publicationDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl mt-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <CardDescription className="flex-grow">{post.summary}</CardDescription>
                  <Button asChild variant="link" className="p-0 h-auto justify-start mt-4 text-primary font-semibold">
                    <Link href={`/blog/${post.slug}`}>
                      Lire la suite <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
