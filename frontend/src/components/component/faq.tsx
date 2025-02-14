import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function FAQ() {
  return (
    <div className="w-full max-w-3xl mx-auto py-12 md:py-20">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h1>
          <p className="mt-2 text-muted-foreground md:text-xl">Get answers to your questions about our Smart Statement Reader.</p>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="flex items-center justify-between">
              <h3 className="text-lg font-medium">How does the PDF to CSV converter work?</h3>
            </AccordionTrigger>
            <AccordionContent>
              <div className="prose text-muted-foreground">
                <p>
                  Our platform allows users to sign up and log in securely. Once logged in, you can upload any PDF document,
                  and our system will extract valuable data from it, converting it into CSV format for easy analysis.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Can I chat with my PDF content?</h3>
            </AccordionTrigger>
            <AccordionContent>
              <div className="prose text-muted-foreground">
                <p>
                  Yes! After uploading your PDF, you can interact with its content using our AI-powered chat feature, powered by Gemini.
                  This allows you to ask questions and extract relevant insights directly from your document.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="flex items-center justify-between">
              <h3 className="text-lg font-medium">How can I preview my CSV file?</h3>
            </AccordionTrigger>
            <AccordionContent>
              <div className="prose text-muted-foreground">
                <p>
                  Once you upload a CSV file, our platform provides a clean and structured preview of the data,
                  allowing you to review the extracted information before further analysis.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Can I visualize my CSV data?</h3>
            </AccordionTrigger>
            <AccordionContent>
              <div className="prose text-muted-foreground">
                <p>
                  Absolutely! Our platform includes powerful data visualization tools, enabling you to generate
                  various charts and graphs based on your uploaded CSV files. This helps you analyze trends
                  and gain deeper insights from your data.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Is my data secure?</h3>
            </AccordionTrigger>
            <AccordionContent>
              <div className="prose text-muted-foreground">
                <p>
                  Yes, we prioritize user security and data privacy. Your uploaded files are processed securely,
                  and we ensure that your information remains protected throughout the conversion and visualization process.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}