import React from "react";
import { SpotlightHero } from "@/components/Home/Hero/SpotlightHero";
import homeConfig from "@/lib/constants/homeConfig";
import { Background } from "@/components/Layout/Background";
import FeatureWithNumberList from "@/components/Home/Features/FeatureWithNumberList";
import FeatureWithImageList from "@/components/Home/Features/FeatureWithImageList";
import FeaturesWithDotList from "@/components/Home/Features/FeaturesWithDotList";
import { AnimatedTestimonials } from "@/components/Home/Testimonials/animated-testimonials";
import ContactWithBackgroundBeamsCollision from "@/components/Home/Contact/ContactWithBackgroundBeamsCollision";
import BigFooter from "@/components/Home/Footer/Big-Footer";
import { ParallaxServicesEffect } from "@/components/Home/Services/ParallaxServicesEffect";
import { CompareGallery } from "@/components/Home/Gallery/CompareGallery";
import FloatingNavbar from "@/components/Layout/Navbars/FloatingNavbar";
import Theme from "@/components/Layout/providers/Theme";

export default function Home() {
  const {
    spotlightHero,
    GridandDot,
    parallaxServicesData,
    FeatureWithNumberListData,
    FeatureWithImageListData,
    FeaturesWithDotListData,
    main,
    testimonialsData,
    Contacts,
    ShimmerButton,
    Bigfooter,
    CompareGalleryData,
    FloatingNavbarConfig,
    ContactForm,
  } = homeConfig;

  return (
    <Theme>
      <header className="z-[9999]">
        <nav aria-label="Main Navigation">
          <FloatingNavbar
            className=""
            menuItems={FloatingNavbarConfig.menuItems}
          />
        </nav>
      </header>
      <main>
        <Background
          mainClassName={GridandDot.mainclassName}
          secondClassName={GridandDot.secondclassName}
        >
          <section className="relative overflow-hidden h-screen z-20">
            <div className="fixed top-0 left-0 w-full h-full z-20">
              <SpotlightHero
                isRtl={main.isRtl}
                title={
                  <>
                    {spotlightHero.title.map((line: string, index: number) => (
                      <React.Fragment key={index}>
                        {line}
                        {index < spotlightHero.title.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </>
                }
                description={spotlightHero.description}
                spotlightClassName={spotlightHero.spotlightClassName}
                spotlightFill={spotlightHero.spotlightFill}
                button1Text={spotlightHero.buttons[0].text}
                button1Url={spotlightHero.buttons[0].url}
                button1TargetBlank={spotlightHero.buttons[0].targetBlank}
                button2Text={spotlightHero.buttons[1].text}
                button2Url={spotlightHero.buttons[1].url}
                button2TargetBlank={spotlightHero.buttons[1].targetBlank}
              />
            </div>
          </section>
          <div className="min-h-screen w-full z-50 items-center justify-center antialiased relative overflow-hidden">
            <Background
              mainClassName={GridandDot.mainclassName}
              secondClassName={GridandDot.secondclassName}
            >
              <section className="w-full">
                <ParallaxServicesEffect
                  services={parallaxServicesData.service}
                  title={parallaxServicesData.title}
                  subtitle={parallaxServicesData.subtitle}
                  isRtl={main.isRtl}
                />
              </section>
              <section className="w-full">
                <FeatureWithNumberList
                  startingFeatures={FeatureWithNumberListData.startingFeatures}
                  titleText={FeatureWithNumberListData.titleText}
                  typingText={FeatureWithNumberListData.typingText}
                  imageUrl={FeatureWithNumberListData.imageUrl}
                  isRtl={main.isRtl}
                />
              </section>
              <section className="w-full">
                <FeatureWithImageList
                  features={FeatureWithImageListData.startingFeatures}
                  typingText={FeatureWithImageListData.typingText}
                  titleText={FeatureWithImageListData.titleText}
                  imageUrl={FeatureWithImageListData.imageUrl}
                  isRtl={main.isRtl}
                />
              </section>
              <section className="w-full">
                <FeaturesWithDotList
                  benefits={FeaturesWithDotListData.benefits}
                  typingText={FeaturesWithDotListData.typingText}
                  titleText={FeaturesWithDotListData.titleText}
                  imageUrl={FeaturesWithDotListData.imageUrl}
                  isRtl={main.isRtl}
                />
              </section>
              {/* <ParallaxGallery /> */}
              <section className="w-full">
                <CompareGallery
                  images={CompareGalleryData.images}
                  headerText={CompareGalleryData.headerText}
                  beforeText={CompareGalleryData.beforeText}
                  afterText={CompareGalleryData.afterText}
                  isRtl={main.isRtl}
                />
              </section>
              <section className="w-full">
                <AnimatedTestimonials
                  testimonials={testimonialsData}
                  autoplay={true}
                  isRtl={main.isRtl}
                />
              </section>
              <section id="contact" className="w-full ">
                <ContactWithBackgroundBeamsCollision
                  contactDetails={Contacts}
                  isRtl={main.isRtl}
                  ShimmerButtonLight={ShimmerButton.ShimmerButtonLight}
                  ShimmerButtonDark={ShimmerButton.ShimmerButtonDark}
                  ShimmerButtonText={ShimmerButton.ShimmerButtonText}
                  ContactForm={ContactForm}
                />
              </section>
            </Background>
          </div>
        </Background>
      </main>
      <footer className="w-full z-40 items-center justify-center antialiased relative overflow-hidden">
        <BigFooter
          logoDark={main.logoDark}
          logoLight={main.logoLight}
          address={Bigfooter.address}
          phone={Bigfooter.phone}
          email={Bigfooter.email}
          socialMediaLinks={Bigfooter.socialMediaLinks}
          navLinks={Bigfooter.navLinks}
        />
      </footer>
    </Theme>
  );
}
