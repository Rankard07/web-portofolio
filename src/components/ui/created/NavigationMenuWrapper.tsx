import * as React from "react";
import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Logo } from "@/assets/svg/logo.tsx";
import { cn } from "@/lib/utils";
import { ListItem } from "@/components/ui/created/ListItem.tsx";

interface MenuItems {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  children?: MenuItems[];
}

interface NavigationMenuWrapperProps {
  className?: string;
  logo?: {
    url?: string;
    src?: string;
    alt?: string;
    title?: string;
    className?: string;
    showIcon?: boolean;
  };
  items?: MenuItems[];
}

const defaultItems: MenuItems[] = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Projects",
    url: "/projects",
    description: "Explore my latest work and case studies.",
  },
  {
    title: "Services",
    url: "/services",
    children: [
      {
        title: "Web Development",
        url: "/services/web-dev",
        description: "Modern, responsive websites built with React and Astro.",
      },
      {
        title: "UI/UX Design",
        url: "/services/design",
        description:
          "User-centered design focusing on accessibility and aesthetics.",
      },
    ],
  },
  {
    title: "About",
    url: "/about",
  },
  {
    title: "Contact",
    url: "/contact",
  },
];

export function NavigationMenuWrapper({
  className,
  logo = {
    url: "/",
    title: "Portofolio",
    showIcon: true,
  },
  items = defaultItems,
}: NavigationMenuWrapperProps) {
  return (
    // <>
    //   <NavigationMenu>
    //     <NavigationMenuList>
    //       {logo && (
    //         <NavigationMenuItem>
    //           <NavigationMenuLink href={logo.url} className={logo.className}>
    //             <img src={logo.src} alt={logo.alt} title={logo.title} />
    //           </NavigationMenuLink>
    //         </NavigationMenuItem>
    //       )}
    //     </NavigationMenuList>
    //   </NavigationMenu>

    //   <NavigationMenu>
    //   <NavigationMenuList>
    //     <NavigationMenuItem>
    //       <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
    //       <NavigationMenuContent>
    //         <NavigationMenuLink>Link</NavigationMenuLink>
    //       </NavigationMenuContent>
    //     </NavigationMenuItem>
    //   </NavigationMenuList>
    // </NavigationMenu>
    // </>

    <header
      className={cn(
        // "bg-background/60" membuat warna tema Anda jadi transparan 60%
        // "backdrop-blur-md" memberikan efek blur pada konten di bawahnya
        "sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur-md supports-backdrop-filter:bg-background/60",
        className,
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <a
            href={logo.url}
            className={cn(
              "flex items-center gap-2 font-bold text-xl transition-colors hover:text-primary",
              logo.className,
            )}
          >
            {logo.showIcon && <Logo size={32} className="text-primary" />}
            <span>{logo.title}</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        {/* <div className="hidden md:flex"> */}
        <div className="hidden md:flex flex-1 justify-end">
          <NavigationMenu delayDuration={300}>
            <NavigationMenuList>
              {/* LOOP: Iterates through defaultItems array:
                  - Home (no children) → renders NavigationMenuLink
                  - Projects (no children) → renders NavigationMenuLink  
                  - Services (has children array) → renders NavigationMenuTrigger with dropdown
                  - About (no children) → renders NavigationMenuLink
                  - Contact (no children) → renders NavigationMenuLink */}
              {items.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {/* TERNARY: Check if item has children property
                      TRUE → Services (renders dropdown trigger + content)
                      FALSE → Home, Projects, About, Contact (renders flat link) */}
                  {item.children ? (
                    <>
                      {/* ← YA = Services saja (punya children: Web Dev, UI/UX) */}
                      {/* SERVICES DROPDOWN TRIGGER: Displays "Services" text with chevron icon */}
                      <NavigationMenuTrigger
                        onClick={(e) => e.preventDefault()}
                        /* className={navigationMenuTriggerStyle({
                          variant: "default",
                          size: "default",
                        })} */
                        // className="btn btn-outline btn-sm border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        {item.title}
                        {/*  ← Tampil: "Services" (dengan dropdown indicator ▼) */}
                      </NavigationMenuTrigger>
                      {/* SERVICES DROPDOWN CONTENT: Shows when hovering/clicking Services */}
                      <NavigationMenuContent>
                        <ul className="grid w-100 gap-3 p-4 md:w-125 md:grid-cols-2 lg:w-150">
                          {/* LOOP: Renders children of Services:
                              - "Web Development" with description
                              - "UI/UX Design" with description */}
                          {item.children.map((child) => (
                            <ListItem
                              key={child.title}
                              title={child.title}
                              href={child.url}
                            >
                              {child.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    // ← TIDAK = Home, Projects, About, Contact (flat items)
                    /* FLAT NAV LINKS: Renders for items WITHOUT children
                       Displays: "Home", "Projects", "About", "Contact" */
                    <NavigationMenuLink
                      asChild
                      /* className={navigationMenuTriggerStyle({
                        variant: "outline",
                      })} */
                      // className="btn btn-outline btn-sm border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <a href={item.url}>{item.title}</a>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left flex items-center gap-2">
                  {logo.showIcon && <Logo size={24} className="text-primary" />}
                  {logo.title}
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {items.map((item) => (
                  <div key={item.title} className="flex flex-col gap-2">
                    <a
                      href={item.url}
                      className="text-lg font-medium transition-colors hover:text-primary"
                    >
                      {item.title}
                    </a>
                    {item.children && (
                      <div className="ml-4 flex flex-col gap-2 border-l pl-4 mt-1">
                        {item.children.map((child) => (
                          <a
                            key={child.title}
                            href={child.url}
                            className="text-sm text-muted-foreground hover:text-primary"
                          >
                            {child.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="mt-4 pt-4 border-t">
                  <Button className="w-full">Let's Talk</Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
