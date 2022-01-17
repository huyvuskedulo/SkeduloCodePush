//
//  ViewController.swift
//  SkeduloCodePush
//
//  Created by Huy Vu on 11/01/2022.
//

import UIKit
import React
import ZIPFoundation

class ViewController: UIViewController, UIAlertViewDelegate {
    
    @IBOutlet weak var _nativeCountLabel: UILabel!
    @IBOutlet weak var _downloadLatestBtn: UIButton!
    static var shared:ViewController? = nil;

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
        ViewController.shared = self;
        _downloadLatestBtn.isHidden = true;
    }

    @IBAction func onMexClicked(_ sender: Any) {

        let rootView = RCTRootView(bridge: AppDelegate.bridge, moduleName: "RNHighScores", initialProperties: nil)
        
        let vc = UIViewController()
        vc.modalPresentationStyle = .fullScreen

        vc.view = rootView
        
        SwiftPluginCall.sharedController = vc;
        
        self.present(vc, animated: true, completion: nil)
    }
    
    @IBAction func increaseCountToRN(_ sender: Any) {
        EventEmitter.sharedInstance.dispatch(name: "increaseCount", body: nil)
    }
    
    public func updateCount() {
        _nativeCountLabel.text = String(SwiftPluginCall.nativeCountData)
    }
    
    @IBAction func downloadLatest(_ sender: Any) {
        
    }

    @IBAction func onDevelopmentModeChanged(_ sender: UISwitch) {
        
        _downloadLatestBtn.isHidden = sender.isOn
        
        AppDelegate.isDevelopmentOn = sender.isOn
        
        if !sender.isOn {
            let fileManager = FileManager()
            let destinationURL = FileManager.default.urls(for: .documentDirectory, in:.userDomainMask)[0].appendingPathComponent("mex", isDirectory: true)

            let sourceUrl = Bundle.main.url(forResource: "main", withExtension: "zip")!
            
            do {
                try fileManager.removeItem(at: destinationURL)
            } catch {
                print("Delete failed:\(error)")
            }
            
            do {
                try fileManager.createDirectory(at: destinationURL, withIntermediateDirectories: true, attributes: nil)
                try fileManager.unzipItem(at: sourceUrl, to: destinationURL)
            } catch {
                print("Extraction of ZIP archive failed with error:\(error)")
            }
        }
        
        AppDelegate.shared!.reloadBridge()
    }
    
    @IBAction func completeJobSimulator(_ sender: Any) {
        async {
    
            do {
                
                let result = try await JSProcessManager.shared.invokeMethod(methodName: "onJobCompleted")
                
                if (result.message != "") {
                    ViewController.showWindowAlert(alertMessage: result.message, inVC: self, callback: {
                        UIApplication.shared.open(URL(string: result.redirectionUrl)!, options: [:], completionHandler: nil)
                    });
                } else {
                    ViewController.showWindowAlert(alertMessage: "Job changed to Completed", inVC: self, callback: nil);
                }

            } catch {
                
            }
        }
    
    }
    
    
    static func showWindowAlert(alertMessage: String, inVC:UIViewController, callback: (() -> Void)?) {
            DispatchQueue.main.async(execute: {
            
                let alert2 = UIAlertController(title: "", message: alertMessage, preferredStyle: .alert)
                let defaultAction2 = UIAlertAction(title: "OK", style: .default, handler: { action in
                    if (callback != nil){
                        callback!()
                    }
                })
                alert2.addAction(defaultAction2)
                    
                inVC.present(alert2, animated: false, completion: nil)
            })
        }
}

